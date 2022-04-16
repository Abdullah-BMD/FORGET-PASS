import * as jwt from 'jsonwebtoken';
const { environment } = require('../../environment')
const SHA256 = require('crypto-js/sha256');

exports.validateToken = async (ctx: any) => {
    
    if (
        !ctx.request.headers.authorization ||
        !ctx.request.headers.authorization.split(' ')[1]
    ) {
        throw new Error('please provide token')
    }
    else {
        const theToken = ctx.request.headers.authorization.split(' ')[1];

        return jwt.verify(theToken, JSON.stringify(SHA256(environment.ADMIN_TOKEN).words), (err: any, decoded: any) => {
            if (decoded) {
                return 'success';
            }
            if (err) {
                throw new Error('invalid token')
            }
        });
    }
}
