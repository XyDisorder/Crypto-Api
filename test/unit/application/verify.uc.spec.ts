import { VerifyUseCase } from '../../../src/application/use-cases/verify.uc';
import { SignerPort }    from '../../../src/domain/ports/signer.port';
import { JsonValue }     from '../../../src/domain/shared/json.types';

describe('VerifyUseCase', () => {
    const signerStub: SignerPort = {
        sign:   jest.fn(),
        verify: jest.fn((_, __, result = true) => result), // default true
    } as unknown as SignerPort;

    const uc = new VerifyUseCase(signerStub);
    const data: JsonValue = { foo: 'bar' };
    const sig  = 'sig';

    it('returns true when SignerPort.verify returns true', () => {
        (signerStub.verify as jest.Mock).mockReturnValueOnce(true);
        expect(uc.execute(data, sig)).toBe(true);
        expect(signerStub.verify).toHaveBeenCalledWith(data, sig);
    });

    it('returns false when SignerPort.verify returns false', () => {
        (signerStub.verify as jest.Mock).mockReturnValueOnce(false);
        expect(uc.execute(data, sig)).toBe(false);
    });
});
