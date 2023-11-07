import { OPERATORS, SPECIALS } from './constants';

export type Operator = typeof OPERATORS[number];

export type Special = typeof SPECIALS[number];

export type DagType = 'string' | 'number' | 'function' | 'operator';