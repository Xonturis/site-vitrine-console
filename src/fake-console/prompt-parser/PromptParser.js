import PromptLemma from "./PromptLemma"


function parseText(text) {
    let words = []
    let acc = ""
    let deep = 0
    for(let c = 0; c < text.length; c++) {
        let char = text[c]
        
        if(char === '{') { // add 1 to deep
            if(deep === 0) {
                if(acc.length > 0){
                    words.push(acc)
                }
                acc = ""
            } else {
                acc += '{'
            }
            deep += 1
        } else if(char === '}') { // sub 1 to deep, if deep == 0 push to words, empty acc
            deep -= 1
            if (deep === 0) {
                words.push(acc)
                acc = ""
            } else {
                acc += '}'
            }
        } else {
            acc += char
        }
    }
    if(acc.length > 0){
        words.push(acc)
    }
    console.log('---');
    console.log(words);
    console.log('---');
    return words
}


function generatePromptLemme(conductor, prompt, typing_delay) {
    let lemme_text = parseText(prompt)
    let lemme = []
    for(let i = 0; i < lemme_text.length; i++) {
        let lemma = lemme_text[i]
        let pl = new PromptLemma(conductor, lemma)
        pl.set_typing_delay(typing_delay)
        lemme.push(pl)
    }

    return lemme
}

export default generatePromptLemme