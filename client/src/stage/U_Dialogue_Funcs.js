import U_Entity from "../frame/U_Entity.js";
import IF_JSON_Script from "../settings/IF_JSON_Script.js";
import C_Dialogue from "./C_Dialogue.js";
import C_Stage from "./C_Stage.js";

let instanced
export default class {

    /**
     * @param {U_Entity} e 
     */
    constructor(e) {
        if (instanced) return instanced
        instanced = this
        this.st = e.GetComponent(C_Stage)
        this.dia = e.GetComponent(C_Dialogue)
    }

/**
 * 显示独白
 * @param {IF_JSON_Script['内容']} text 
 * @param {IF_JSON_Script['位置']} pos 
 */
    async ShowText(text, pos = '中'){
        const {textTitle, nextIndicator, mask} = this.st
        mask.style.opacity = '1'
        textTitle.style.opacity = '1'
        let top = '50%'
        let bottom = 'auto'
        if( pos === '上'){
            top = '20%'
            bottom = 'auto'
        }
        else if( pos === '下'){
            top = 'auto'
            bottom = '20%'
        }
        textTitle.style.top = top
        textTitle.style.bottom = bottom
        nextIndicator.style.opacity = '0'

        // textTitle.innerText = text
        this.dia.currentCount = 0
        this.dia.currentText = text
        this.dia.isNextClick = false
        this.dia.isSpeaking = true
        this.TypingTitle()

        return new Promise(res => {
            this.dia.inter = setInterval(() => {
                if (this.dia.currentCount < this.dia.currentText.length) return
                nextIndicator.style.opacity = '1'
                this.dia.isSpeaking = false
                if (!this.dia.isNextClick && !this.dia.isSpeedUp) return  // 没有按下next也无加速的情况
                clearInterval(this.dia.inter)
                
                mask.style.opacity = '0'
                textTitle.style.opacity = '0'
                nextIndicator.style.opacity = '0'
                res()
            }, 300)
        })
    }


    TypingTitle() {
        const { currentCount, currentText, cap } = this.dia
        if (currentCount < currentText.length) {
            this.dia.currentCount += 1
            const text = currentText.slice(0, this.dia.currentCount)
            this.st.textTitle.innerText = text + '_'
            this.dia.timer = setTimeout(this.TypingTitle.bind(this), cap)
            return
        }
        this.st.textTitle.innerText = currentText
        clearTimeout(this.dia.timer)
    }








    /**
     * 显示对话
     * @param {String} roller 
     * @param {IF_JSON_Script['内容']} speech 
     */
    async ShowDialogu(roller, speech) {
        // console.log('开始对白', roller)
        const { bg1, bg2, dialogue, rollerName, nextIndicator } = this.st
        const arr = [dialogue, rollerName]
        for (let i of arr) {
            // i.style.display = 'block'
            i.style.opacity = '1'
        }
        rollerName.innerText = roller
        // dialogue.innerText = speech
        await this._StartSpeechTypeing(speech)

        // debugger
    }


    _StartSpeechTypeing(speech) {
        const { nextIndicator } = this.st
        this.dia.currentCount = 0
        this.dia.currentText = speech
        this.dia.isNextClick = false
        this.dia.isSpeaking = true
        // nextIndicator.style.display = 'none'
        nextIndicator.style.opacity = '0'
        
        this.Typing()
        
        return new Promise(res => {
            this.dia.inter = setInterval(() => {
                if (this.dia.currentCount < this.dia.currentText.length) return
                // nextIndicator.style.display = 'block'
                nextIndicator.style.opacity = '1'
                this.dia.isSpeaking = false
                if (!this.dia.isNextClick && !this.dia.isSpeedUp) return  // 没有按下next也无加速的情况
                clearInterval(this.dia.inter)
                res()
            }, 300)
        })
    }

    Typing() {
        const { currentCount, currentText, cap } = this.dia
        if (currentCount < currentText.length) {
            this.dia.currentCount += 1
            const text = currentText.slice(0, this.dia.currentCount)
            this.st.dialogue.innerText = text + '_'
            this.dia.timer = setTimeout(this.Typing.bind(this), cap)
            return
        }
        this.st.dialogue.innerText = currentText
        clearTimeout(this.dia.timer)
    }


    SpeedUpSpeech() {
        // console.log('按下')
        this.dia.cap = 10
        this.dia.isNextClick = true
        this.dia.isSpeedUp = true
    }
    
    EndDialogue() {
        this.dia.cap = 100
        // console.log('结束')
        this.dia.isSpeedUp = false
        if( this.dia.isSpeaking ){
            this.dia.isNextClick = false
        }
    }

}