import AES from "crypto-js/aes";
import { enc } from "crypto-js";

export const encryptId = (str: string) => {
  const ciphertext = AES.encrypt(str, "secretPassphrase");
  return encodeURIComponent(ciphertext.toString());
};

export const decryptId = (str: string) => {
  const decodedStr = decodeURIComponent(str);
  return AES.decrypt(decodedStr, "secretPassphrase").toString(enc.Utf8);
};
