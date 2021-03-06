/**
 * Lox lexical type.
 */
export enum TokenType {
  LEFT_PAREN = "LEFT_PAREN",
  RIGHT_PAREN = "RIGHT_PAREN",
  LEFT_BRACE = "LEFT_BRACE",
  RIGHT_BRACE = "RIGHT_BRACE",
  COMMA = "COMMA",
  DOT = "DOT",
  MINUS = "MINUS",
  PLUS = "PLUS",
  SEMICOLON = "SEMICOLON",
  SLASH = "SLASH",
  STAR = "STAR",

  BANG = "BANG",
  BANG_EQUAL = "BANG_EQUAL",
  EQUAL = "EQUAL",
  EQUAL_EQUAL = "EQUAL_EQUAL",
  GREATER = "GREATER",
  GREATER_EQUAL = "GREATER_EQUAL",
  LESS = "LESS",
  LESS_EQUAL = "LESS_EQUAL",

  IDENTIFIER = "IDENTIFIER",
  STRING = "STRING",
  NUMBER = "NUMBER",

  AND = "AND",
  CLASS = "CLASS",
  ELSE = "ELSE",
  FALSE = "FALSE",
  FOR = "FOR",
  FUN = "FUN",
  IF = "IF",
  NIL = "NIL",
  OR = "OR",
  PRINT = "PRINT",
  RETURN = "RETURN",
  SUPER = "SUPER",
  THIS = "THIS",
  TRUE = "TRUE",
  VAR = "VAR",
  WHILE = "WHILE",

  EOF = "EOF",
}

const keywordTokenTypes = new Set<TokenType>([
  TokenType.AND,
  TokenType.CLASS,
  TokenType.ELSE,
  TokenType.FALSE,
  TokenType.FOR,
  TokenType.FUN,
  TokenType.IF,
  TokenType.NIL,
  TokenType.OR,
  TokenType.PRINT,
  TokenType.RETURN,
  TokenType.SUPER,
  TokenType.THIS,
  TokenType.TRUE,
  TokenType.VAR,
  TokenType.WHILE,
]);

/**
 * Lox lexical token.
 */
export class Token {
  type: TokenType;
  lexeme: string;
  literal: any;
  line: number;
  column: number;

  constructor(
    type: TokenType,
    lexeme: string,
    literal: any = null,
    line: number,
    column: number
  ) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
    this.column = column;
  }

  isKeyword(): boolean {
    return keywordTokenTypes.has(this.type);
  }

  isLiteral(): boolean {
    return this.literal !== null;
  }

  toString(): string {
    const str = `${this.type}[${this.line}:${this.column}]`;

    if (this.isLiteral() || this.type === TokenType.IDENTIFIER) {
      return `${str} -> ${this.lexeme}`;
    }
    return str;
  }
}
