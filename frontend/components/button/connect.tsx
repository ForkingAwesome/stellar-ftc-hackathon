"use client";

import { useFreighter } from "@/contexts/FreighterContext";
import { useStellarWallet } from "@/contexts/wallet-context";
import { getAddress, isConnected } from "@stellar/freighter-api";
import { useEffect, useState } from "react";

export const ConnectWallet = () => {
  const { disconnectWallet, connectWallet, account } = useFreighter();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const checkConnected = async () => {
      if (await isConnected()) setConnected(true);
    };
  }, []);

  return (
    <div>
      {connected ? (
        <div onClick={disconnectWallet}>
          Disconnect Wallet ({account as string})
        </div>
      ) : (
        <div onClick={connectWallet}>Connect Wallet</div>
      )}
    </div>
  );
};
