"use client";

import { useStellarWallet } from "@/contexts/wallet-context";

export const ConnectWallet = () => {
  const { isConnected, connectWallet, disconnectWallet, currentAddress } =
    useStellarWallet();

  return (
    <div>
      {isConnected() ? (
        <div onClick={disconnectWallet}>
          Disconnect Wallet ({currentAddress.substring(0, 10)})
        </div>
      ) : (
        <div onClick={connectWallet}>Connect Wallet</div>
      )}
    </div>
  );
};
