import PromptLemma from "../PromptLemma"


async function fontsize(parentPL, args) {
    let splitted = args.split(/,(.*)/g)
    let size = splitted[0]
    let prompt = splitted[1]
    let subconsole = new PromptLemma(parentPL.conductor, prompt)
    subconsole.set_before_text(`<span class="prompt" style="font-size: ${size}; color: inherit;">`)
    subconsole.set_after_text("</span>")
    parentPL.sub_parsers.push(subconsole)
}

export default fontsize