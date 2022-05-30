import { Token } from "./token";

/**
 * @generated
 */
export abstract class Expr {}

/**
 * @generated
 */
export class Grouping extends Expr {
  expression: Expr;

  constructor(expression: Expr) {
    super();

    this.expression = expression;
  }
}

/**
 * @generated
 */
export class Binary extends Expr {
  left: Expr;
  operator: Token;
  right: Expr;

  constructor(left: Expr, operator: Token, right: Expr) {
    super();

    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

/**
 * @generated
 */
export class Unary extends Expr {
  operator: Token;
  right: Expr;

  constructor(operator: Token, right: Expr) {
    super();

    this.operator = operator;
    this.right = right;
  }
}

/**
 * @generated
 */
export class Literal extends Expr {
  value: any;

  constructor(value: any) {
    super();

    this.value = value;
  }
}
