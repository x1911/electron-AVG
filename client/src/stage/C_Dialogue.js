
export default class{
    constructor(){
        this.currentCount = 0
        this.currentText = ''
        this.timer = null
        this.inter = null
        /** 字间隔 */
        this.cap = 100
        /** 是否按下next */
        this.isNextClick = false
        /** 是否谈话中 */
        this.isSpeaking = false
        /** 是否加速 */
        this.isSpeedUp = false
    }
}