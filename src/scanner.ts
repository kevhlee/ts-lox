import { Token, TokenType } from "./token";

function isAlpha(ch: string): boolean {
  return ch == "_" || (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z");
}

function isDigit(ch: string): boolean {
  return ch >= "0" && ch <= "9";
}

function isAlphaDigit(ch: string): boolean {
  return isAlpha(ch) || isDigit(ch);
}

const keywordTokenTypeMap: { [id: string]: TokenType } = {
  and: TokenType.AND,
  class: TokenType.CLASS,
  else: TokenType.ELSE,
  false: TokenType.FALSE,
  for: TokenType.FOR,
  fun: TokenType.FUN,
  if: TokenType.IF,
  nil: TokenType.NIL,
  or: TokenType.OR,
  print: TokenType.PRINT,
  return: TokenType.RETURN,
  super: TokenType.SUPER,
  this: TokenType.THIS,
  true: TokenType.TRUE,
  var: TokenType.VAR,
  while: TokenType.WHILE,
};

/**
 * Lexical scanner.
 */
export class Scanner {
  private source: string;
  private tokens: Token[];
  private start: number;
  private current: number;
  private line: number;
  private column: number;

  constructor(source: string) {
    this.source = source;
    this.tokens = [];
    this.start = 0;
    this.current = 0;
    this.line = 1;
    this.column = 1;
  }

  scan(): Token[] {
    if (this.tokens.length > 0) {
      return this.tokens;
    }

    while (!this.isAtEnd()) {
      this.start = this.current;
      this.scanToken();
    }

    return this.tokens;
  }

  private addToken(type: TokenType, literal: any = null) {
    this.tokens.push(
      new Token(type, this.getLexeme(), literal, this.line, this.column)
    );
    this.column += this.current - this.start;
  }

  private advance(): string {
    return this.source[this.current++];
  }

  private getLexeme(): string {
    return this.source.substring(this.start, this.current);
  }

  private isAtEnd(): boolean {
    return this.current >= this.source.length;
  }

  private match(ch: string): boolean {
    if (this.isAtEnd() || this.source[this.current] !== ch) {
      return false;
    }

    this.current++;
    return true;
  }

  private peek(): string {
    return this.source[this.current];
  }

  private scanToken() {
    const ch = this.advance();

    switch (ch) {
      case "(":
        this.addToken(TokenType.LEFT_PAREN);
        break;
      case ")":
        this.addToken(TokenType.RIGHT_PAREN);
        break;
      case "{":
        this.addToken(TokenType.LEFT_BRACE);
        break;
      case "}":
        this.addToken(TokenType.RIGHT_BRACE);
        break;
      case ",":
        this.addToken(TokenType.COMMA);
        break;
      case ".":
        this.addToken(TokenType.DOT);
        break;
      case "-":
        this.addToken(TokenType.MINUS);
        break;
      case "+":
        this.addToken(TokenType.PLUS);
        break;
      case ";":
        this.addToken(TokenType.SEMICOLON);
        break;
      case "/":
        if (this.match("/")) {
          this.skipComment();
        } else {
          this.addToken(TokenType.SLASH);
        }
        break;
      case "*":
        this.addToken(TokenType.STAR);
        break;
      case "!":
        this.addToken(this.match("=") ? TokenType.BANG_EQUAL : TokenType.BANG);
        break;
      case "=":
        this.addToken(
          this.match("=") ? TokenType.EQUAL_EQUAL : TokenType.EQUAL
        );
        break;
      case ">":
        this.addToken(
          this.match("=") ? TokenType.GREATER_EQUAL : TokenType.GREATER
        );
        break;
      case "<":
        this.addToken(this.match("=") ? TokenType.LESS_EQUAL : TokenType.LESS);
        break;
      case " ":
      case "\t":
        this.column++;
        break;
      case "\n":
        this.line++;
        break;
      case '"':
        this.scanStringToken();
        break;
      default:
        if (isDigit(ch)) {
          this.scanNumberToken();
        } else if (isAlpha(ch)) {
          this.scanWordToken();
        } else {
          throw `Unrecognized character on line ${this.line}, column: ${this.column}`;
        }
        break;
    }
  }

  private scanNumberToken() {
    while (!this.isAtEnd() && isDigit(this.peek())) {
      this.advance();
    }

    if (this.match(".")) {
      while (!this.isAtEnd() && isDigit(this.peek())) {
        this.advance();
      }
    }

    this.addToken(TokenType.NUMBER, Number.parseFloat(this.getLexeme()));
  }

  private scanStringToken() {
    this.advance(); // Consume starting "

    while (!this.isAtEnd() && isDigit(this.peek())) {
      this.advance();
    }

    if (this.isAtEnd()) {
      throw `Unterminated string on line ${this.line}, column: ${this.column}`;
    }

    this.advance(); // Consume ending "

    this.addToken(
      TokenType.STRING,
      this.source.substring(this.start + 1, this.current - 1)
    );
  }

  private scanWordToken() {
    while (!this.isAtEnd() && isAlphaDigit(this.peek())) {
      this.advance();
    }

    this.addToken(
      keywordTokenTypeMap[this.getLexeme()] || TokenType.IDENTIFIER
    );
  }

  private skipComment() {
    while (!this.isAtEnd() && this.peek() !== "\n") {
      this.advance();
    }
  }
}
