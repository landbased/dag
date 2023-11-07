import * as fs from 'fs';
import { isNodeError, ReturnWithOkFlag } from './utils';

export function getFileNameFromCommandLine(): string {
  return process.argv[2];
}

export function readSource(filename: string): ReturnWithOkFlag<string> {
  try {
  const raw = fs.readFileSync(filename,'utf8');
  return [raw, true];
  } catch(error: unknown) {
    if (isNodeError(error) && error.code === 'ENOENT') {
      console.error(`File ${error.path} couldn't be read`);
    }
    return ['', false];
  }
}