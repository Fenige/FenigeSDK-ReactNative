export enum Config {
  PROD = 'PROD',
  DEBUG = 'DEBUG'
}

export type RedirectUrl = {
  successUrl: string;
  failureUrl: string;
}

export type Address = {
  countryCode: string;
  city: string;
  postalCode: string;
  street: string;
  houseNumber: string;
}

export type Sender = {
  firstName: string;
  lastName: string;
  address: Address;
}

export type GetTransactionIdRequest = {
  transactionId: string;
  currencyCode: string;
  amount: number;
  description: string;
  formLanguage: string;
  redirectUrl: RedirectUrl;
  sender: Sender;
  merchantUrl: string;
  orderNumber: string;
  autoClear: boolean;
  typeOfAuthorization: string;
  source: 'REACT_NATIVE'
}