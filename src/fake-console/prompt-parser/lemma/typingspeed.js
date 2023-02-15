import PromptLemma from "../PromptLemma"


async function typingspeed(parentPL, args) {
    let splitted = args.split(/,([\s\S]*)/g)
    let delay = parseInt(splitted[0])
    let prompt = splitted[1]
    let subpl = new PromptLemma(parentPL.conductor, prompt)
    subpl.set_typing_delay(delay)
    parentPL.sub_parsers.push(subpl)
}

export default typingspeed