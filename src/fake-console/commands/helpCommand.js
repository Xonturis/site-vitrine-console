import helpPrompt from "../prompts/helpPrompt";

function helpCommand(conductor, args) {
    conductor.init(helpPrompt())
    conductor.play()
    return true
}

export default helpCommand