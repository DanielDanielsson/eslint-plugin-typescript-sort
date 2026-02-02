import * as path from 'path';
import * as parser from '@typescript-eslint/parser';

export const filename = path.join(__dirname, 'file.ts');

export const languageOptions = {
  parser,
  parserOptions: {
    ecmaVersion: 'latest' as const,
    sourceType: 'module' as const,
    project: path.join(__dirname, './tsconfig.json'),
  },
};
