import { SignUseCase }  from '../../../src/application/use-cases/sign.uc';
import { SignerPort }   from '../../../src/domain/ports/signer.port';
import { JsonValue }    from '../../../src/domain/shared/json.types';

describe('SignUseCase', () => {
    const stubSig = 'deadbeef';
    const signerStub: SignerPort = {
        sign:   jest.fn(() => stubSig),
        verify: jest.fn(),
    } as unknown as SignerPort;

    it('returns the signature provided by SignerPort.sign', () => {
        const uc = new SignUseCase(signerStub);
        const payload: JsonValue = { a: 1 };

        expect(uc.execute(payload)).toBe(stubSig);
        expect(signerStub.sign).toHaveBeenCalledWith(payload);
    });
});
