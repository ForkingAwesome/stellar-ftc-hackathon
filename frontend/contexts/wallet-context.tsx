"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  ISupportedWallet,
  FREIGHTER_ID,
} from "@creit.tech/stellar-wallets-kit";

interface StellarWalletProviderProps {
  children: ReactNode;
}

interface StellarContextValue {
  isConnected: () => boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  getAddress: () => string;
}

const StellarWalletContext = createContext<StellarContextValue | undefined>(
  undefined
);

export const StellarWalletProvider = ({
  children,
}: StellarWalletProviderProps) => {
  const kit: StellarWalletsKit = new StellarWalletsKit({
    network: WalletNetwork.TESTNET,
    selectedWalletId: FREIGHTER_ID,
    modules: allowAllModules(),
  });

  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    const storedAccount = localStorage.getItem(
      "stellar_wallet_kit_current_connected_address"
    );
    if (storedAccount) {
      setConnected(true);
    }
  }, []);

  const connectWallet = async () => {
    try {
      await kit.openModal({
        onWalletSelected: async (option: ISupportedWallet) => {
          kit.setWallet(option.id);

          const { address } = await kit.getAddress();

          localStorage.setItem(
            "stellar_wallet_kit_current_connected_address",
            address
          );

          setConnected(true);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = () => {
    const address = localStorage.getItem(
      "stellar_wallet_kit_current_connected_address"
    );

    if (connected && address) {
      localStorage.removeItem("stellar_wallet_kit_current_connected_address");
      setConnected(false);
    }
  };

  const getAddress = () => {
    return localStorage.getItem(
      "stellar_wallet_kit_current_connected_address"
    ) as string;
  };

  const isConnected = () => {
    return connected;
  };

  return (
    <StellarWalletContext.Provider
      value={{ isConnected, connectWallet, disconnectWallet, getAddress }}
    >
      {children}
    </StellarWalletContext.Provider>
  );
};

export const useStellarWallet = () => {
  const context = useContext(StellarWalletContext);

  if (!context) {
    throw new Error(
      "useStellarWallet must be used within a StellarWalletProvider"
    );
  }

  return context;
};
