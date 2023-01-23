"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io_1 = require("./io");
const lexer_1 = require("./lexer");
if (require.main === module) {
    main();
}
function main() {
    const [source, readOk] = (0, io_1.readSource)((0, io_1.getFileNameFromCommandLine)());
    if (!readOk) {
        return;
    }
    const [tokenList, lexOk] = (0, lexer_1.lex)(source);
    if (!lexOk) {
        return;
    }
    console.log(tokenList);
}
