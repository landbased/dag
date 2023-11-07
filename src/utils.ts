import { KEYWORDS, SPECIALS, OPERATORS } from './constants';
import { type Keyword, type Special, type Operator } from './types';

export type ReturnWithOkFlag<T> = [a: T, e: boolean];

export function isNodeError(error: any): error is NodeJS.ErrnoException { return error instanceof Error; }

export function isKeyword(value: string): value is Keyword {
    return KEYWORDS.includes(value as Keyword);
}

export function isSpecial(value: string): value is Special {
    return SPECIALS.includes(value as Special);
}

export function isOperator(value: string): value is Operator {
    return OPERATORS.includes(value as Operator);
}