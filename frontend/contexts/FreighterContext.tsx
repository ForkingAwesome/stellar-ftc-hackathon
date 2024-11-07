"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getNetwork, getAddress, isAllowed } from "@stellar/freighter-api";

interface FreighterContextValue {
  account: string | null;
  network: {
    network: string;
    networkPassphrase: string;
  } | null;
  walletStatus: "Locked" | "Unlocked" | undefined;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

interface FreighterProviderProps {
  children: ReactNode;
}

const FreighterContext = createContext<FreighterContextValue | undefined>(
  undefined
);

export const FreighterProvider = ({ children }: FreighterProviderProps) => {
  const [account, setAccount] = useState<string | null>(null);
  const [network, setNetwork] = useState<{
    network: string;
    networkPassphrase: string;
  } | null>(null);
  const [walletStatus, setWalletStatus] = useState<"Locked" | "Unlocked">();

  useEffect(() => {
    const initializeFreighter = async () => {
      const disconnected = localStorage.getItem("freighterDisconnected");

      if (!disconnected && (await isAllowed())) {
        const publicKey = await getAddress();
        if (publicKey) {
          setAccount(publicKey.address);
          setNetwork(await getNetwork());
          setWalletStatus("Unlocked");
        } else setWalletStatus("Locked");
      }
    };

    initializeFreighter();
  }, []);

  const connectWallet = async () => {
    try {
      const publicKey = await getAddress();
      if (publicKey) {
        setAccount(publicKey.address);
        localStorage.removeItem("freighterDisconnected");
      }
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setNetwork(null);
    localStorage.setItem("freighterDisconnected", "true");
  };

  return (
    <FreighterContext.Provider
      value={{
        account,
        network,
        walletStatus,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </FreighterContext.Provider>
  );
};

export const useFreighter = () => {
  const context = useContext(FreighterContext);
  if (context === undefined) {
    throw new Error("useFreighter must be used within a FreighterProvider");
  }
  return context;
};
