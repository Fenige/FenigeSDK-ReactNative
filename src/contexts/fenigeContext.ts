import { createContext } from "react";
import type { Config, RedirectUrl } from "../types";

interface FenigeContextType {
  modalVisible: boolean;
  transactionId: string | undefined;
  config: Config | undefined;
  setModalVisible: (modalVisible: boolean) => void;
  setTransactionId: (transactionId: string) => void;
  setConfig: (config: Config) => void;
  setRedirectUrl: (redirectUrl: RedirectUrl) => void;
  setFinishCallback: (finishCallback: (transactionId: string) => void) => void | undefined;
}

export const FenigeContext = createContext<FenigeContextType | undefined>(undefined);