"use client";

import { useStellarWallet } from "@/contexts/wallet-context";

export const ConnectWallet = () => {
  const { isConnected, connectWallet, disconnectWallet, getAddress } =
    useStellarWallet();

  return (
    <button>
      {isConnected() ? (
        <div onClick={disconnectWallet}>
          Disconnect Wallet ({getAddress().substring(0, 10)})
        </div>
      ) : (
        <div onClick={connectWallet}>Connect Wallet</div>
      )}
    </button>
  );
};
