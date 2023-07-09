import U_Entity from "../frame/U_Entity.js";
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
     * @param {String} roller 
     * @param {String} speech 
     */
    async ShowDialogu(roller, speech) {
        const { bg1, bg2, dialogue, rollerName, nextIndicator } = this.st
        const arr = [dialogue, rollerName]
        for (let i of arr) {
            // i.style.display = 'block'
            i.style.opacity = '1'
        }
        rollerName.innerText = roller
        // dialogue.innerText = speech
        await this._StartTypeing(speech)

        
        

        console.log('结束对白')
        // debugger
    }


    _StartTypeing(speech) {
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
        console.log('按下')
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

    // ClickNext() {
    //     console.log('点击')
    // }
}