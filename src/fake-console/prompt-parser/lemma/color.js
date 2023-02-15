import PromptLemma from "../PromptLemma"


async function color(parentPL, args) {
    let splitted = args.split(/,([\s\S]*)/g)
    let color = splitted[0]
    let prompt = splitted[1]
    let subconsole = new PromptLemma(parentPL.conductor, prompt)
    subconsole.set_before_text(`<span class="prompt" style="color: ${color}; font-size: inherit;">`)
    subconsole.set_after_text("</span>")
    parentPL.sub_parsers.push(subconsole)
}

export default color