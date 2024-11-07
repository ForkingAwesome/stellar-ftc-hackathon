import {
  Address,
  BASE_FEE,
  Contract,
  Keypair,
  nativeToScVal,
  Networks,
  scValToNative,
  SorobanRpc,
  TransactionBuilder,
} from "@stellar/stellar-sdk";
import {
  USDC_CONTRACT_ADDRESS,
  VOUCHER_ESCROW_CONTRACT_ADDRESS,
  VOUCHER_TOKEN_CONTRACT_ADDRESS,
} from "./constants";
import { signTransaction } from "@stellar/freighter-api";

const server = new SorobanRpc.Server("https://soroban-testnet.stellar.org:443");
const sourceKeypair = Keypair.fromSecret(
  "SBIVELOJETCXBY6KIEKMNFXAS2SR4I6F25GAAIURQNAAX6AFS3ZVBCQ4"
);

async function getSourceAccount() {
  const account = await server.getAccount(sourceKeypair.publicKey());
  return account;
}

export const sendTransaction = async () => {
  try {
    const sourceAccount = await getSourceAccount();
    const contract = new Contract(VOUCHER_ESCROW_CONTRACT_ADDRESS);

    const from = nativeToScVal(Address.fromString(sourceKeypair.publicKey()));
    const usdcAddress = nativeToScVal(
      Address.fromString(USDC_CONTRACT_ADDRESS)
    );
    const voucherAddress = nativeToScVal(
      Address.fromString(VOUCHER_TOKEN_CONTRACT_ADDRESS)
    );
    const amount = nativeToScVal(1, { type: "i128" });

    let builtTransaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        contract.call(
          "get_usdc_and_mint_voucher_tokens",
          from,
          usdcAddress,
          voucherAddress,
          amount
        )
      )
      .setTimeout(30)
      .build();

    let preparedTransaction = await server.prepareTransaction(builtTransaction);

    preparedTransaction.sign(sourceKeypair);

    try {
      let sendResponse = await server.sendTransaction(preparedTransaction);
      console.log(`Sent transaction: ${JSON.stringify(sendResponse)}`);

      if (sendResponse.status === "PENDING") {
        let getResponse = await server.getTransaction(sendResponse.hash);
        while (getResponse.status === "NOT_FOUND") {
          console.log("Waiting for transaction confirmation...");
          getResponse = await server.getTransaction(sendResponse.hash);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        console.log(`getTransaction response: ${JSON.stringify(getResponse)}`);

        if (getResponse.status === "SUCCESS") {
          if (!getResponse.resultMetaXdr) {
            throw "Empty resultMetaXDR in getTransaction response";
          }
          let transactionMeta = getResponse.resultMetaXdr
            .v3()
            .sorobanMeta()
            ?.returnValue();
          console.log(`Transaction result: ${transactionMeta?.value()}`);
        } else {
          throw `Transaction failed: ${getResponse.resultXdr}`;
        }
      } else {
        throw new Error("");
      }
    } catch (err) {
      console.log("Sending transaction failed");
      console.log(JSON.stringify(err));
    }
  } catch (error) {
    console.log(error);
  }
};
