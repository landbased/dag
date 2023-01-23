import { readSource,getFileNameFromCommandLine } from './io';
import { lex } from './lexer';

if (require.main === module) {
  main();
}

function main() {
  const [source, readOk] = readSource(getFileNameFromCommandLine());
  if (!readOk) {
    return;
  }
  
  const [tokenList, lexOk] = lex(source);
  if (!lexOk) {
    return;
  }

  console.log(tokenList);
}

