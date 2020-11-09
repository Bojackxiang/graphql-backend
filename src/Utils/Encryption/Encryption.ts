const bcrypt = require('bcrypt');
const saltRounds = 10;

export const encryptionPassword = (text: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(text, saltRounds, function(err: any, hash: any) {
            resolve(hash)
            reject(err);
        });
    })
}

export const encryptionCompare = (hashedTxt: string, plainTxt: string) => {
    console.log(plainTxt, hashedTxt);
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainTxt, hashedTxt, function(err: any, result: any) {
            console.log({err});
            resolve(result)
            reject(err)
        });
    })
}