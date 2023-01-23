export type ReturnWithOkFlag = [a: any, e: boolean];

export function isNodeError(error: any): error is NodeJS.ErrnoException { return error instanceof Error; }