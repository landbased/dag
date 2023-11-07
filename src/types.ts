import { OPERATORS, SPECIALS, KEYWORDS, INSTRINSICS } from './constants';

export type Operator = typeof OPERATORS[number];

export type Special = typeof SPECIALS[number];

export type Keyword = typeof KEYWORDS[number];

export type Instrinsic = keyof typeof INSTRINSICS;

export type DagType = 'string' | 'number' | 'function' | 'operator';