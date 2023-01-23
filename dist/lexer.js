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
        if (source[i] === '\n') {
            newLine();
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
            let text = '';
            while (CHAR_REGEX.test(source[i]) || NUM_REGEX.test(source[i])) {
                text += source[i];
                increment();
            }
            tokenList.push({
                kind: 'symbol',
                value: text,
                text,
                line,
                posInLine,
            });
            continue;
        }
        // string
        if (source[i] === '\'') {
            let text = '';
            while (source[i] !== '\'') {
                text += source[i];
                increment();
            }
            tokenList.push({
                kind: 'string',
                value: text.slice(1, -1),
                text,
                line,
                posInLine,
            });
            continue;
        }
        // number
        if (NUM_REGEX.test(source[i]) || source[i] === '.') {
            let text = '';
            let encounteredDecimal = false;
            while (NUM_REGEX.test(source[i]) || source[i] === '.') {
                if (source[i] === '.') {
                    if (encounteredDecimal) {
                        console.error(`Error parsing at ${line}:${posInLine} -- number had two decimal places`);
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
                posInLine,
            });
            continue;
        }
    }
    return [tokenList, true];
}
exports.lex = lex;
