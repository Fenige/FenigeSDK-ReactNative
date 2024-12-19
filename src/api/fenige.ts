import axios from "axios";
import { apiDevURL, apiURL } from "../constants";
import { Config, type GetTransactionIdRequest } from "../types";

export const getTransactionId = (apiKey: string, data: GetTransactionIdRequest, config: Config) => {
  return axios.post('transactions/pre-initialization', data, {
    baseURL: config === Config.PROD ? apiURL : apiDevURL,
    headers: {
      "Api-Key": apiKey
    }
  })
}