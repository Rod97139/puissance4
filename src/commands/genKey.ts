import { generateKeyPairSync } from 'crypto'
import { writeFileSync } from 'fs'
import * as path from 'path'


const { privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    }
})


writeFileSync(path.resolve('privatekey.pem'), privateKey)