import { queMail } from "./mail";
import {Request} from "express"

type CommandFunc = (args: string[], ip?: string) => string;

interface filedir {
  [key : string] : string
}

let filedirtory:filedir = {
  "intro.md" : 'Hallo! Ik ben Nils, een gemotiveerde programmeur met ervaring in fullstack webontwikkeling. Ik werk graag aan zowel persoonlijke als professionele projecten en heb ook interesse in systeembeheer en netwerken. In mijn vrije tijd onderhoud ik een home server en werk ik aan open source projecten. Daarnaast ben ik fanatiek gamer en techliefhebber.',
  "werkervaring.md" : '',
  "opleiding.md" : '',
}
interface command {
  [key : string] : string
}
const commandsarr: command = {
"echo" : "Displays the given sentence back", 
"help" : "Displays all available commands",
"time" : "Displays the time",
"add" : "Displays the sum of 2 numbers",
"upper" : "Displays the rest of the command in All caps",
"clear" : "Clears the screen",
"exit" : "Goes back to the homepage",
"man" : "shows the manual page of a command",
"ls" : "Shows all files",
"cat" : "Reads a file for the context of the file",
"mail" : "Sends a mail to me, with a message. write first your mail and then the text"
}
let allcommandsstring : string = "";

function generatecommandstring() {
  allcommandsstring = Object.keys(commandsarr).join(", ");
}

generatecommandstring();
function parseArgsToStringExcepthefirstone(input: string[]): string {
  input.shift();
  return input.join(' ');
}
const commands: Record<string, CommandFunc> = {
  echo: (args) => args.join(' '),
  help: () => `Available commands: ${allcommandsstring}`,
  time: () => new Date().toString(),
  add: ([a, b]) => {
    const sum = parseFloat(a) + parseFloat(b);
    return isNaN(sum) ? 'Invalid numbers' : `Result: ${sum}`;
  },
  upper: (text) => text.join(" ").toUpperCase(),
  cat: (args) => {
      const namefile = args[0];
      if(!(namefile in filedirtory)){
        return `File ${namefile} does not exsist`;
      }
      return filedirtory[args[0]];
  } ,
  ls: () => {
    let allfiles: string = '';
    for (let file in filedirtory) {
      allfiles += `${file} `
    }
    return allfiles
  },
  mail: (args, ip) => {
    if (args[0].includes("@") && args[0].includes(".")) {
      const response: Boolean = queMail(ip?? "0.0.0.0", {
        mailsender: args[0],
        text: parseArgsToStringExcepthefirstone(args)
      });
      return response ? "Mail send" : "Mail error";
    }
    return "Mail wasnt in the right format";
  }
};

export function dispatch(input: [string, string[]], req: Request): string {
  const ip = req.ip;
  const [name, args] = input;
  if (name == "man") {
    return commandsarr[args[0]] ? commandsarr[args[0]] : `Command not found: ${args[0]}`;
  }
  const fn = commands[name];

  if (!fn) {
    return `Command not found: ${name}`;
  }

  try {
    return fn(args, ip);
  } catch (err) {
    return `Error: ${(err as Error).message}`;
  }
}