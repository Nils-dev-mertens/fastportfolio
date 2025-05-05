type CommandFunc = (args: string[]) => string;

const commands: Record<string, CommandFunc> = {
  echo: (args) => args.join(' '),
  help: () => 'Available commands: echo, help, time, add, upper',
  time: () => new Date().toString(),
  add: ([a, b]) => {
    const sum = parseFloat(a) + parseFloat(b);
    return isNaN(sum) ? 'Invalid numbers' : `Result: ${sum}`;
  },
  upper: ([text]) => text.toUpperCase(),
};

export function dispatch(input: [string, string[]]): string {
  const [name, args] = input;
  const fn = commands[name];

  if (!fn) {
    return `Command not found: ${name}`;
  }

  try {
    return fn(args);
  } catch (err) {
    return `Error: ${(err as Error).message}`;
  }
}