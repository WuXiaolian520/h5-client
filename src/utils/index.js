import CryptoJS from "crypto-js";

export function getImageUrl(name, dir="images") {
  return new URL(`../assets/${dir}/${name}`, import.meta.url).href
}

export function decrypt(content){
  let keyHex = CryptoJS.enc.Utf8.parse('D638D193EB29AC87C0950AB36B80E0E8');
  let bytes = CryptoJS.AES.decrypt(content, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return bytes.toString(CryptoJS.enc.Utf8);
}