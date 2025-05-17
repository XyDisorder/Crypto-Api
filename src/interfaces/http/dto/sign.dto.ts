export class SignRequestDto {
    body!: string;
}

export class SignResponseDto {
    signature!: string;
}

export class VerifyRequestDto {
    body!: string;
    signature!: string;
}

export class VerifyResponseDto {
    valid!: boolean;
}