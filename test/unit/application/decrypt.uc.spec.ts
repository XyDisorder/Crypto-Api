import { DecryptUseCase } from '../../../src/application/use-cases/decrypt.uc';
import { EncrypterPort }  from '../../../src/domain/ports/encrypter.port';
import { JsonMap }        from '../../../src/domain/shared/json.types';

describe('DecryptUseCase', () => {
    const fakeDecrypted: JsonMap = { foo: 'bar' };

    const encrypterStub: EncrypterPort = {
        encryptDepth: jest.fn(),
        decryptDepth: jest.fn(() => fakeDecrypted),
    } as unknown as EncrypterPort;

    it('delegates to EncrypterPort.decryptDepth and returns its result', () => {
        const uc = new DecryptUseCase(encrypterStub);
        const input: JsonMap = { foo: 'YmFy' };

        const result = uc.execute(input);

        expect(result).toBe(fakeDecrypted);
        expect(encrypterStub.decryptDepth).toHaveBeenCalledTimes(1);
        expect(encrypterStub.decryptDepth).toHaveBeenCalledWith(input);
    });
});
