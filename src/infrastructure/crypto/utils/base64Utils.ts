import { JsonValue } from '../../../domain/shared/json.types';

export class Base64Utils {
  static toB64(value: JsonValue): string {
    // objects or array → JSON
    if (typeof value === 'object' && value !== null) {
      return Buffer.from(JSON.stringify(value)).toString('base64');
    }
    // string, number, boolean, null → direct conversion
    return Buffer.from(String(value)).toString('base64');
  }

  /** heuristic :  base64 valid  (length multiple of 4, alphabet 64) */
  static looksLikeBase64(str: string): boolean {
    return str.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(str);
  }

  static tryFromB64(val: JsonValue): JsonValue {
    if (typeof val !== 'string') return val;

    if (!this.looksLikeBase64(val)) return val;

    const decoded = Buffer.from(val, 'base64').toString();

    try {
      return JSON.parse(decoded) as JsonValue;          // object, number, boolean, null
    } catch {
      return decoded;
    }
  }
}
