import {JsonValue} from "../../../domain/shared/json.types";

export class HmacUtils {
    static canonical(value: JsonValue): string {
        if (value === null || typeof value !== 'object') {
            return JSON.stringify(value); // string | number | boolean | null
        }
        if (Array.isArray(value)) {
            return `[${value.map(HmacUtils.canonical).join(',')}]`; // array
        }

        return `{${Object.keys(value)
            .sort()
            .map((k) => `"${k}":${HmacUtils.canonical((value as any)[k])}`)
            .join(',')}}`; // object
    }


}