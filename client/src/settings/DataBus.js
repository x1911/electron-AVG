import { CustomEventListener } from "../frame/CustomEventListener.js"

let instance
export default class {
    constructor() {
        if (instance) return instance
        instance = this

        this.DEBUG = true
        
        this.event = CustomEventListener

        this.setting = {  //设置
            HighResolution: false,
            Shadow: 'low',  // 'Shadow low mid high'  阴影质量

            isPlayBg: true,  // 是否播放背景音乐
            bgVolume: 1,  //音效音量
            isPlaySfx: true,  // 是否播放音效
            sfxVolume: 0.9,  //音效音量
            vibrate: true,   // 控制震动

        }
    }

    /** @returns {} */
    // static GetInstance(){
        // if(!instance) instance =  new default()
    // }
}
