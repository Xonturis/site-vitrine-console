import wait from './lemma/wait'
import color from './lemma/color'
import fontsize from './lemma/fontsize'
import typingspeed from './lemma/typingspeed'
import generatePromptLemme from "./PromptParser"

const commands = {
    "--w": wait,
    "--c": color,
    "--fs": fontsize,
    "--ts": typingspeed
}

class PromptLemma {
    
    constructor(conductor, lemma) {
        this.conductor = conductor
        this.lemma = lemma
        this.sub_parsers = []
        this.text = ""
        this.before_text = ""
        this.after_text = ""
        this.typing_delay = 100
    }

    set_typing_delay(delay) {
        this.typing_delay = delay
    }

    set_before_text(text) {
        this.before_text = text
    }

    set_after_text(text) {
        this.after_text = text
    }

    get_text() {
        if(this.sub_parsers.length === 0){
            return `${this.before_text}${this.text}${this.after_text}`
        }
        let text = this.before_text
        for(let i = 0; i < this.sub_parsers.length; i++){
            text += this.sub_parsers[i].get_text()
        }
        text += this.after_text
        return text
    }

    async parseCommand(lemme) {
        let lemme_splitted = lemme.split(/=(.*)/g)
        console.log('--- pc');
        console.log(lemme_splitted);
        console.log('---');
        let command = lemme_splitted[0]
        let args = [] // csv args
        if(lemme_splitted.length > 1) {
            args = lemme_splitted[1]
        }

        if(commands[command] === undefined) {
            console.error("Unknown command")
            return
        }
        if(args.length === 0) await commands[command](this)
        else await commands[command](this, args, ...args.split(','))
    }

    async generateWord(word) {
        if(word === '') {
            return
        }
        let letter = word[0]
        this.text += letter
        this.conductor.update()
        await wait(this, this.typing_delay)
        return await this.generateWord(word.slice(1))
    }

    async play() {
        if(this.lemma.startsWith('--')) {
            await this.parseCommand(this.lemma)
            this.command = true
        } else {
            let lemme = generatePromptLemme(this.conductor, this.lemma, this.typing_delay)
            if(lemme.length === 1 && lemme[0].lemma !== this.lemma) {
                this.sub_parsers = lemme
            }
            if(lemme.length > 1) {
                this.sub_parsers = lemme
            }
        }
        if(this.sub_parsers.length > 0) {
            for(let i = 0; i < this.sub_parsers.length; i++){
                let sub_parser = this.sub_parsers[i]
                await sub_parser.play()
            }
            return
        }

        if(this.command) {
            return
        }
        
        await this.generateWord(this.lemma)
    }

}

export default PromptLemma