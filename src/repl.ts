import { initState } from "./state.js";

export function cleanInput(text: string): string[] {
  const words: string[] = text.toLowerCase().trim().split(/\s+/);
  return words;
}

export function startREPL() {
  const state = initState();
  const rl = state.readline;
  rl.prompt();
  rl.on("line", (callback) => {
    const words = cleanInput(callback);
    const [word, ...args] = words;
    const commands = state.commands;
    let found = false;
    if (callback === "") {
      rl.prompt();
    } else {
      const command = commands[word];
      if (command.name === word) {
        command.callback(state, ...args);
        found = true;
      }

      if (!found) {
        console.log("Unknown command");
      }
      rl.prompt();
    }
  });
  rl.on("close", () => {
    process.exit(0);
  });
  rl.prompt();
}
