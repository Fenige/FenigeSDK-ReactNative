import { useContext } from "react";
import { FenigeContext } from "../contexts/fenigeContext";
import { getTransactionId } from "../api/fenige";
import type { Config, GetTransactionIdRequest, RedirectUrl, Sender } from "../types";

export const useFenige = () => {
  const context = useContext(FenigeContext);

  if (!context) {
    throw new Error('useFenige must be used within a FenigeProvider');
  }

  const { setModalVisible, setConfig, setTransactionId, setRedirectUrl, setFinishCallback } = context;

  const initPayment = async (
    apiKey: string,
    currencyCode: string,
    amount: number,
    description: string,
    merchantUrl: string,
    orderNumber: string,
    formLanguage: string,
    redirectUrl: RedirectUrl,
    sender: Sender,
    transactionId: string,
    autoClear: boolean,
    isRecurring: boolean,
    config: Config,
    onFinishCallback: (transactionId: string) => void
  ) => {
    setModalVisible(true);

    const data: GetTransactionIdRequest = {
      transactionId,
      currencyCode,
      amount,
      description,
      formLanguage,
      redirectUrl,
      sender,
      merchantUrl,
      orderNumber,
      autoClear,
      typeOfAuthorization: isRecurring ? 'COF' : 'PURCHASE',
    };

    try {
      const response = await getTransactionId(apiKey, data, config);
      const transactionId = response.data?.transactionId ?? '';

      if (transactionId) {
        setConfig(config);
        setTransactionId(transactionId);
        setModalVisible(true);
        setRedirectUrl(redirectUrl);
        setFinishCallback(() => onFinishCallback)
      }
    } catch (err: any) {
      onFinishCallback('');
    }
  };

  return { initPayment };
};