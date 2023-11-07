import { lex } from './lexer';

describe('lexer', () => {
    test('simple assignment', () => {
        const [lexed, ok] = lex('x = 1  + 2');
        expect(ok).toBe(true);
    
        expect(lexed[0]).toMatchObject({
            kind: 'symbol',
            value: 'x',
            text: 'x',
            line: 1,
            posInLine: 1,
        });
        expect(lexed[1]).toMatchObject({
            kind: '=',
            value: null,
            text: '=',
            line: 1,
            posInLine: 3,
        });
        expect(lexed[2]).toMatchObject({
            kind: 'number',
            value: 1,
            text: '1',
            line: 1,
            posInLine: 5,
        });
        expect(lexed[3]).toMatchObject({
            kind: 'operator',
            value: '+',
            text: '+',
            line: 1,
            posInLine: 8,
        });
        expect(lexed[4]).toMatchObject({
            kind: 'number',
            value: 2,
            text: '2',
            line: 1,
            posInLine: 10,
        });
    });

    test('multi line',() => {
        const [lexed, ok] = lex(
`a = 'hello';

b = "world";`
        );
        expect(ok).toBe(true);
        expect(lexed[0]).toMatchObject({
            kind: 'symbol',
            value: 'a',
            line: 1,
            posInLine: 1,
        });
        expect(lexed[2]).toMatchObject({
            kind: 'string',
            value: 'hello',
            line: 1,
            posInLine: 5,
        });
        expect(lexed[3]).toMatchObject({
            kind: ';',
            value: null,
            line: 1,
            posInLine: 12,
        });
        expect(lexed[4]).toMatchObject({
            kind: 'symbol',
            value: 'b',
            line: 3,
            posInLine: 1,
        });
        expect(lexed[7]).toMatchObject({
            kind: ';',
            value: null,
            line: 3,
            posInLine: 12,
        });
    });

    test('no ok on bad token', () => {
        const error = jest.spyOn(console, 'error').mockImplementation(() => {});
        const [_, ok] = lex('$');
        expect(ok).toBe(false);
        expect(error).toHaveBeenCalledTimes(1);
        expect(error).toHaveBeenCalledWith('lexing error@1:1: unhandled token');
        error.mockReset();
    });
});
