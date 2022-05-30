const fs = require("fs");
const handlebars = require("handlebars");
const prettier = require("prettier");

// TODO: utilitze custom helpers
const astClassTemplate = handlebars.compile(`/**
 * @generated
 */
export class {{name}} extends Expr {
  {{#each fields}}
  {{this.name}}: {{this.type}};
  {{/each}}

  constructor({{#each fields}}{{#if @last}}{{this.name}}: {{this.type}}{{else}}{{this.name}}: {{this.type}}, {{/if}}{{/each}}) {
    super();

    {{#each fields}}
    this.{{this.name}} = {{this.name}};
    {{/each}}
  }
}`);

// TODO: is JSON the way to define the AST classes?
const astClassDefinitions = [
  {
    name: "Grouping",
    fields: [
      {
        name: "expression",
        type: "Expr",
      },
    ],
  },
  {
    name: "Binary",
    fields: [
      {
        name: "left",
        type: "Expr",
      },
      {
        name: "operator",
        type: "Token",
      },
      {
        name: "right",
        type: "Expr",
      },
    ],
  },
  {
    name: "Unary",
    fields: [
      {
        name: "operator",
        type: "Token",
      },
      {
        name: "right",
        type: "Expr",
      },
    ],
  },
  {
    name: "Literal",
    fields: [
      {
        name: "value",
        type: "any",
      },
    ],
  },
];

let astFileContents = `import { Token } from './token';

/**
 * @generated
 */
export abstract class Expr {}\n`;

for (let astClassDefinition of astClassDefinitions) {
  astFileContents += `\n${astClassTemplate(astClassDefinition)}\n`;
}

astFileContents = prettier.format(astFileContents, { parser: "babel-ts" });

fs.writeFileSync("src/ast.ts", astFileContents);
