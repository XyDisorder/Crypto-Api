import {EncrypterPort} from "../../../src/domain/ports/encrypter.port";
import {JsonMap} from "../../../src/domain/shared/json.types";
import {EncryptUseCase} from "../../../src/application/use-cases/encrypt.uc";

describe('EncryptUseCase', () => {
    const fakeEncrypted: JsonMap = { foo: 'YmFy' };

    const encrypterStub: EncrypterPort = {
        encryptDepth:  jest.fn(() => fakeEncrypted),
        decryptDepth:  jest.fn(),
    } as unknown as EncrypterPort;

    it('delegates to EncrypterPort.encryptDepth', () => {
        const uc = new EncryptUseCase(encrypterStub);
        const input = { foo: 'bar' };
        expect(uc.execute(input)).toEqual(fakeEncrypted);
        expect(encrypterStub.encryptDepth).toHaveBeenCalledWith(input);
    });
});