import { HmacSignerAdapter } from '../../../src/infrastructure/crypto/hmac.signer.adapter';
import { ConfigService } from '@nestjs/config';

const secret = 'my-test-secret';

const configStub = {
    get: (key: string, def?: string) =>
        key === 'HMAC_ALGO' ? 'sha256' : def,
} as unknown as ConfigService;

describe('HmacSignerAdapter', () => {
    const adapter = new HmacSignerAdapter(secret, configStub);

    const payload = { message: 'Hello', ts: 1 };

    it('produces same signature regardless of property order', () => {
        const s1 = adapter.sign(payload);
        const s2 = adapter.sign({ ts: 1, message: 'Hello' });
        expect(s1).toBe(s2);
    });

    it('verify passes with correct sig and fails with tampered data', () => {
        const sig = adapter.sign(payload);
        expect(adapter.verify(payload, sig)).toBe(true);
        expect(adapter.verify({ ...payload, message: 'Oops' }, sig)).toBe(false);
    });
});
