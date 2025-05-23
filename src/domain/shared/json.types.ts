/** Json standard types authorize */
export type JsonPrimitive = string | number | boolean | null;

export interface JsonObject {
  [key: string]: JsonValue;
}

export type JsonValue = JsonPrimitive | JsonValue[] | JsonObject;

export type JsonMap = Record<string, JsonValue>;

/** Convert  JsonValue in stable string  */
export function canonicalize(value: JsonValue): string {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value);            // string | number | boolean | null
  }

  if (Array.isArray(value)) {
    return `[${value.map(canonicalize).join(',')}]`;
  }

  const keys = Object.keys(value).sort();
  const entries = keys.map(k => `"${k}":${canonicalize((value as any)[k])}`);
  return `{${entries.join(',')}}`;
}