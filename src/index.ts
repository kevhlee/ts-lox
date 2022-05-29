import fs from "fs";
import prompt from "prompt-sync";
import { Scanner } from "./scanner";

export function run() {
  const args = process.argv.slice(2);

  if (args.length > 1) {
    console.error("Usage: lox [path to script]");
    process.exit(1);
  }

  if (args.length === 1) {
    runFile(args[0]);
  } else {
    runREPL();
  }
}

function runFile(path: string) {
  runSource(fs.readFileSync(path).toString());
}

function runREPL() {
  const repl = prompt({ sigint: true });

  console.log("| Welcome to Lox!");
  console.log('| Type ".exit" to quit program.\n');

  while (true) {
    const input = repl("> ");
    if (input === ".exit") {
      process.exit(0);
    }

    try {
      runSource(input);
    } catch (err) {
      console.error(err);
    }
  }
}

function runSource(source: string) {
  const scanner = new Scanner(source);

  for (const token of scanner.scan()) {
    console.log(token.toString());
  }
}
