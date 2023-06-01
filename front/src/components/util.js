const CryptoJS = require('crypto-js');

export function encrypt(message) {
    if (message) {
        const key = CryptoJS.enc.Base64.parse('cz0LzgsV3zssbMNDlUOx2wYF6P8W5fMxFyP64vPKa8E=');
        const encryptMessage = CryptoJS.AES.encrypt(message, key, {
            mode: CryptoJS.mode.ECB,
            keySize: 256 / 32
        }).toString();
        return encryptMessage;
    }
    return "";
}

export function decrypt(encryptedMessage) {
    if (encryptedMessage) {
        const key = CryptoJS.enc.Base64.parse('cz0LzgsV3zssbMNDlUOx2wYF6P8W5fMxFyP64vPKa8E=');
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        });
        const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
        return decryptedMessage;
    }
    return '';
}
