import nodeJose, { JWK, JWE } from 'node-jose';
import { createHash } from 'crypto';

export class EncryptionHandler {
  private signatureKey: JWK.Key | undefined;

  constructor() {
    this.generateKey();
  }

  private async generateKey() {
    const SECRET_SIGNATURE = process.env.SECRET_SIGNATURE;

    if (!SECRET_SIGNATURE)
      throw new Error('Define a SECRET_SIGNATURE from `.env`');

    /**
     * Generate a key with `Secret signature`
     * from `.env` file
     */
    this.signatureKey = await JWK.asKey({
      kty: 'oct',
      k: nodeJose.util.base64url.encode(SECRET_SIGNATURE),
    });
  }

  async encrypt<T>(payload: T) {
    if (!this.signatureKey)
      throw new Error('PLEASE CREATE A KEY TO ENCRYPT 🙂');
    const input = JSON.stringify(payload);
    console.log(input)
    const encrypted = await JWE.createEncrypt(
      { format: 'compact' } /** Use Compact Serialization */,
      this.signatureKey
    )
      .update(input)
      .final();

    return encrypted;
  }

  async decrypt<T>(encrypted: string) {
    if (!this.signatureKey)
      throw new Error('PLEASE CREATE A KEY TO DECRYPT 🙂');

    const { payload } = await JWE.createDecrypt(this.signatureKey).decrypt(
      encrypted
    );

    return JSON.parse(payload.toString()) as T;
  }

  generateSHA(value: string) {
    return createHash('sha256').update(value).digest('hex');
  }
}

