import generatePromptLemme from "./prompt-parser/PromptParser";
import executeCommand from "./commandHandler";

class FakeConsoleConductor {

    mountComponent(component) {
        this.update = () => {
            let text = ""
            for(let i = 0; i < this.parsers.length; i++) {
                let parser = this.parsers[i]
                text += parser.get_text()
            }
            component.setState({fake_text: text})
        }
        this.finished = () => {
            let fake_text = component.state.history + component.state.fake_text
            component.setState({fake_text: ""})
            component.setState({history: fake_text})
            this.onFinish()
        }
    }

    handleFinish(callback) {
        this.onFinish = callback
    }

    handleStart(callback) {
        this.onStart = callback
    }

    handleCommand(command) {
        executeCommand(this,command)
    }

    init(prompt) {
        this.unparsed_text = prompt
        this.parsers = generatePromptLemme(this, prompt, 100)
        this.display = ""
    }

    async play() {
        this.onStart()
        for(let i = 0; i < this.parsers.length; i++) {
            let parser = this.parsers[i]
            await parser.play()
        }
        this.finished()

    }
}

export default FakeConsoleConductor