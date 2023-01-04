import * as Crypto from 'crypto'
import { readFileSync } from 'fs'

const algo = 'SHA256'
const privateKey = readFileSync('privateKey.pem')


export function sign(
    str: string
): string {
  return Crypto.sign(algo, Buffer.from(str), privateKey).toString("base64")
}

export function verify(
    str: string,
    signature: string
): boolean {

  return Crypto.verify(algo, Buffer.from(str), privateKey, Buffer.from(signature, 'base64'))

}