"use client";

import { Wallet, SigningKeypair } from "@stellar/typescript-wallet-sdk";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const offramp = async () => {
    const wallet = Wallet.TestNet();

    // Testnet
    const MGI_ACCESS_HOST = "extmgxanchor.moneygram.com";

    const anchor = wallet.anchor({ homeDomain: MGI_ACCESS_HOST });

    const sep10 = await anchor.sep10();

    const authKey = SigningKeypair.fromSecret(
      "SBIVELOJETCXBY6KIEKMNFXAS2SR4I6F25GAAIURQNAAX6AFS3ZVBCQ4"
    );
    const authToken = await sep10.authenticate({ accountKp: authKey });

    console.log("Auth Token:", authToken);

    const assetCode = "USDC";
    const info = await anchor.getInfo();
    const currency = info.currencies.find(({ code }) => code === assetCode);
    if (!currency?.code || !currency?.issuer) {
      throw new Error(
        `Anchor does not support ${assetCode} asset or is not correctly configured on TOML file`
      );
    }

    const { url, id } = await anchor.sep24().withdraw({
      authToken: authToken,
      withdrawalAccount:
        "GCUUX5OGBE5UQFS5NP7E7D5BS6ZFRDUSDSAJBCSQTLOUPK6CITHGFJUV",
      assetCode,
      lang: "en",
      extraFields: {
        amount: "10",
      },
    });

    console.log("URL:", url);
    console.log("ID:", id);

    router.push(url as string);
  };

  return (
    <div>
      <button onClick={offramp} className="">
        Offramp
      </button>
    </div>
  );
};

export default page;
