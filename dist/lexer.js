"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lex = void 0;
const OPERATORS = ['+', '-', '*', '/', '='];
const SPECIALS = [';', '=', 'symbol'];
const CHAR_REGEX = /[A-z]/;
const NUM_REGEX = /[0-9]/;
function lex(source) {
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
    let tokenList = [];
    while (i < source.length) {
        // whitespace
        if (source[i] === ' ') {
            increment();
            continue;
        }
        // endline
        if (source[i] === '\n' || source[i] === '\r') {
            while (i < source.length && source[i] === '\n' || source[i] === '\r') {
                if (source[i] === '\r') {
                    increment();
                }
                else {
                    newLine();
                }
            }
            continue;
        }
        // special / operators
        {
            function isSpecial(c) {
                return SPECIALS.includes(source[i]);
            }
            function isOperator(c) {
                return OPERATORS.includes(source[i]);
            }
            const c = source[i];
            if (isSpecial(c) || isOperator(c)) {
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
        // symbol
        if (CHAR_REGEX.test(source[i])) {
            const posAtStartOfToken = posInLine;
            let text = '';
            while (i < source.length && CHAR_REGEX.test(source[i]) || NUM_REGEX.test(source[i])) {
                text += source[i];
                increment();
            }
            tokenList.push({
                kind: 'symbol',
                value: text,
                text,
                line,
                posInLine: posAtStartOfToken,
            });
            continue;
        }
        // string
        if (source[i] === '\'') {
            const posAtStartOfToken = posInLine;
            let text = '';
            text += source[i];
            increment();
            while (i < source.length && source[i] !== '\'') {
                text += source[i];
                increment();
            }
            text += source[i];
            increment();
            tokenList.push({
                kind: 'string',
                value: text.slice(1, -1),
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
        console.error(`lexing error@${line}:${posInLine}: unhandled Token`);
        return [tokenList, false];
    }
    return [tokenList, true];
}
exports.lex = lex;
