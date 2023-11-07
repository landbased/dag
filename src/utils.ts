export type ReturnWithOkFlag<T> = [a: T, e: boolean];

export function isNodeError(error: any): error is NodeJS.ErrnoException { return error instanceof Error; }