import { ReturnWithOkFlag, isSpecial, isKeyword, isOperator } from './utils';

import { SPECIALS, OPERATORS, KEYWORDS } from './constants';
import { type Special, type Operator, type DagType } from './types';

export type TokenKind = Special | DagType | 'symbol' | 'keyword';

export interface Token {
  kind: TokenKind;
  value: string | number | null;
  text: string;
  line: number;
  posInLine: number;
}

const CHAR_REGEX = /[A-z_]/;

const NUM_REGEX = /[0-9]/;

export function lex(source: string): ReturnWithOkFlag<Array<Token>> {
  let i = 0;
  let line = 1;
  let posInLine = 1;

  function increment() {
    i++;
    posInLine++;
  }

  function newLine() {
    i++;
    line++;
    posInLine = 1;
  }

  let tokenList: Token[] = [];

  while (i < source.length) {
    // whitespace
    if (source[i] === ' ' || source[i] === '\t') {
      increment();
      continue;
    }

    // endline
    if (source[i] === '\n' || source[i] === '\r') {
      while(i < source.length && source[i] === '\n' || source[i] === '\r') {
        if (source[i] === '\r') {
          increment();
        } else {
          newLine();
        }
      }
      continue;
    }
  
    // specials
    {
      const c = source[i];
      if (isSpecial(c)) {
        let text = c;
        tokenList.push({
          kind: c,
          value: null,
          text,
          line,
          posInLine,
        });
        increment();
        continue;
      }
    }

    // operators
    {
      const c = source[i];
      if (isOperator(c)) {
        let text = c;
        tokenList.push({
          kind: 'operator',
          value: c,
          text,
          line,
          posInLine,
        });
        increment();
        continue;
      }
    }

    // symbol or keyword
    if (CHAR_REGEX.test(source[i])) {
      const posAtStartOfToken = posInLine;
      let text = '';
      while (i < source.length && CHAR_REGEX.test(source[i]) || NUM_REGEX.test(source[i])) {
        text += source[i];
        increment();
      }
      const kind = isKeyword(text) ? 'keyword' : 'symbol';

      tokenList.push({
        kind,
        value: text,
        text,
        line,
        posInLine: posAtStartOfToken,
      });
      continue;
    }

    // string
    if (source[i] === '"' || source[i] === '\'') {
      const posAtStartOfToken = posInLine;
      const endToMatch = source[i];
      let text = source[i];
      increment();
      while (i < source.length && source[i] !== endToMatch) {
        text += source[i];
        increment();
      }
      text += source[i];
      increment();
      tokenList.push({
        kind: 'string',
        value: text.slice(1,-1),
        text,
        line,
        posInLine: posAtStartOfToken,
      });
      continue;
    }

    // number
    if (NUM_REGEX.test(source[i]) || source[i] === '.') {
      const posAtStartOfToken = posInLine;
      let text = '';
      let encounteredDecimal = false;
      while (i < source.length && NUM_REGEX.test(source[i]) || source[i] === '.') {
        if (source[i] === '.') {
          if (encounteredDecimal) {
            console.error(`lexing error@${line}:${posInLine}: number has two decimal places`);
            return [tokenList, false];
          }
          encounteredDecimal = true;
        }
        text += source[i];
        increment();
      }
      tokenList.push({
        kind: 'number',
        value: Number(text),
        text,
        line,
        posInLine: posAtStartOfToken,
      });
      continue;
    }

    // UNHANDLED
    console.error(`lexing error@${line}:${posInLine}: unhandled token`);
    return [tokenList, false];
  }

  return [tokenList, true];
} 