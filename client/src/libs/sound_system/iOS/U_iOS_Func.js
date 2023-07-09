


export class U_iOS_Func {
    static CheckisIos() {
        if (!window.webkit) {
            // console.warn('not iOS')
            return false
        }
        return true
    }

    /** 为了兼容 */
    static checkisIos(){ return this.CheckisIos() }

    /**
 * 发送信息到mobile播放声音
 * @param {string} name  音乐名字 
 * @param {number} val 音量
 */
    static SendMsg(name, val) {
        if (!this.checkisIos()) return
        // console.log('播放文件', name, val)
        if (!window.webkit.messageHandlers[name]) return  // 没有监听的内容
        window.webkit.messageHandlers[name].postMessage(val)
    }
}