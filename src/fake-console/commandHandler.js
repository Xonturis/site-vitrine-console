import helpCommand from "./commands/helpCommand";

const commands = {
    "help": helpCommand
}

function executeCommand(conductor, command) {
    let args = command.split(' ')
    commands[args[0]](conductor, args)
}

export default executeCommand