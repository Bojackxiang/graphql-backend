const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

export const encryptionPassword = (text: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(myPlaintextPassword, saltRounds, function(err: any, hash: any) {
            resolve(hash)
            reject(err);
        });
    })
}

export const encryptionCompare = (plainTxt: string, hashedTxt: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainTxt, hashedTxt, function(err: any, result: any) {
            resolve(result)
            reject(err)
        });
    })
}