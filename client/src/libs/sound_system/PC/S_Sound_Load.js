import C_Sound_Data from "../C_Sound_Data.js"
import C_PC_Sound_Data from "./C_PC_Sound_Data.js"

export default class {

    /**
     * @param {Object} o
     * @param {C_Sound_Data} o.sound
     * @param {C_PC_Sound_Data} o.pcData
     */
    constructor(o = {}) {
        this.pc = o.pcData
    }

    /**
     * 读取所有音频文件
     * @param {Array<String>} SoundListSprite 音频文件名
     */
    async Load(SoundListSprite) {
        for (let i of SoundListSprite) {
            const url = `${this.pc.url}${i}.mp3`   // 读取脚步声
            const buff = await this.pc.LoadOne(url)
            this.pc.buffs.set(i, buff)
        }
    }


    /** 
     * 读取url文件
     * @param {string} url
     * @param {string} name
     */
    async LoadUrlFile(url, name) {
        // console.log('传入的内容', url, name)
        try {
            const buff = await this.pc.LoadOne(url + name + '.mp3')
            this.pc.buffs.set(name, buff)
        }
        catch (e) {
            // console.warn('load sound file error', e)
            throw Error(e)
        }
    }


}