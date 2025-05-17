import { Base64EncrypterAdapter } from '../../../src/infrastructure/crypto/base64.encrypter.adapter';
import {HmacSignerAdapter} from "../../../src/infrastructure/crypto/hmac.signer.adapter";

describe('Base64EncrypterAdapter', () => {
  const adapter = new Base64EncrypterAdapter();

  it('encodes then decodes back to the same object', () => {
    const original = { name: 'John', nested: { a: 1 } };
    const enc = adapter.encryptDepth(original);
    const dec = adapter.decryptDepth(enc);
    expect(dec).toEqual(original);
  });

  it('leaves non-base64 strings intact', () => {
    const obj = { raw: 'notBase64' };
    expect(adapter.decryptDepth(obj)).toEqual(obj);
  });
  it('throws on short secret', () => {
    const cfg = { get: () => 'sha256' } as any;
    expect(() => new HmacSignerAdapter('abcd', cfg)).toThrow();
  });

  it('throws on invalid algo', () => {
    const cfg = { get: () => 'md5' } as any;
    expect(() => new HmacSignerAdapter('a'.repeat(32), cfg)).toThrow();
  });
});
