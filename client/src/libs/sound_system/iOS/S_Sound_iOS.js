import C_Sound_Data from "../C_Sound_Data.js";
import IF_Sound_Sytem from "../IF_Sound_Sytem.js";
import { U_iOS_Func } from "./U_iOS_Func.js"

export default class extends IF_Sound_Sytem {
    constructor(d) {
        super()
        /** @type {C_Sound_Data} */
        this.data = d.sound
    }

    /**
 * 发送信息到mobile播放声音
 * @param {string} name  音乐名字 
 * @param {number} val 音量
 */
    _sendMsg(name, val) {
        U_iOS_Func.SendMsg(name, val)
        // console.log('播放文件', name, val)
    }

    /**
 * 通知mobile播放声音
 * @param {string} name SoundList 中声音名字
 * @param {number} vol 音量
 * @param {number} rate 变奏范围
 * @returns null
 */
    _PlayBuffSound(name, vol = 1, rate = 0) {  // 加入设置中控制音量大小
        if (!this.data.isPlaySfx) return   // 2021.6.14 加入是否播放声音
        if (vol < 0.02) return   // 声音过小

        // this._t = (1 - loss) * DB.setting.sfxVolume   // 正常音量乘以比例
        this.data.vol = vol * this.data.sfxVolume  // 正常音量乘以比例
        // this.data.vol = vol * (this.data.sfxVolume + 0.2)  // 2022.11.8 声音在iOS上要大点
        // this.data.vol = vol  // 正常音量乘以比例
        this.data.vol = THREE.MathUtils.clamp(this.data.vol, 0.05, 1)  // 限制最大最小值
        if (isNaN(this.data.vol)) return console.error('not value', this.data.vol)
        // console.log('播放音量衰减', vol, 1 - this.data.vol, name)
        this._sendMsg('playSound', {  // 太多声音造成卡顿
            name, loss: 1 - this.data.vol, rate
            // name, loss: 0, rate
        })
    }

    /**
 * 循环背景音
 * @param {string} name 
 * @param {number} vol 
 * @returns 
 */
    MusicLoopPlay(name, vol = 1) {
        // return  // del
        // loss =  1 - (1 - loss) * DB.setting.sfxVolume   // 乘以一个设置声音
        if (!this.data.isPlayBg) return  // 2021.6.14 加入是否播放声音
        this.data.bgVol = vol * this.data.bgVolume   // 乘以一个设置声音
        console.log('循环播放背景音', name, vol)
        this.data.bgMusicName = name
        this._sendMsg('loopSound', {
            name, loss: 1 - this.data.bgVol
        })
    }

    /** 停止背景音乐 */
    MusicLoopStop() {
        this._sendMsg('stopLoop', {
            name: this.data.bgMusicName
        })
        this.data.bgMusicName = null
    }

    /** 降低声音 */
    MusicVolDown() {
        if (!this.data.bgMusicName) return
        // console.log('降低声音', 1 - this.data.bgVol)
        this._sendMsg('loopSound', {
            name: this.data.bgMusicName,
            // loss: Math.min((1 - this.data.bgVol / 3), 0.7)
            loss: (1 - this.data.bgVol)  // 2022.11.8 修复
        })
    }

    /** 恢复声音 */
    MusicVolRecover() {
        if (!this.data.bgMusicName) return
        this._sendMsg('loopSound', {
            name: this.data.bgMusicName,
            loss: 1 - this.data.bgVol
        })
    }

    /** 正常播放声音 */
    async SoundPlay(name, vol = 1) {
        if (!this.data.isPlaySfx) return   // 2021.6.14 加入是否播放声音
        this.data.vol = vol * this.data.sfxVolume  // 正常音量乘以比例
        this.data.vol = THREE.MathUtils.clamp(this.data.vol, 0.02, 1)  // 限制最大最小值
        if (isNaN(this.data.vol)) return console.error('not value', this.data.vol)
        this._sendMsg('playVoice', {
            name, loss: 1 - this.data.vol
        })
    }

    /**
     * iOS震动效果
     * 0最轻 1较轻 2最强 3弱 4硬但不强
     * @param {number} level 震动 
     */
    Vibrat(level = 2) {  // 震动
        if (!this.data.vibrate) return  // 2021.6.16 加入控制震动
        // 0最轻 1较轻 2最强 3弱 4硬但不强
        this._sendMsg('vibrat', {
            name: level + '',    // 直接将数据存name
        })
    }

    _Get3DVol(pos) {
        this.data.v.set(pos.x, pos.y, pos.z)
        this.data.dis = this.data.earPos.distanceTo(this.data.v)
        this.data.dis = (this.data.maxDistance - this.data.dis) / this.data.maxDistance
        return this.data.dis
    }

    SoundPlay3D(name, pos) {
        if (!this.data.earPos) return
        const v = this._Get3DVol(pos)
        this.SoundPlay(name, v)
    }

    SoundEffect(name) {
        const v = Math.random() * 0.4 + 0.6
        this._PlayBuffSound(name, v, 0.3)
    }

    /**
     * 播放3D特效音
     * @param {String} name 声音名字 
     * @param {*} pos 
     * @returns 
     */
    SoundEffect3D(name, pos) {
        if (!this.data.earPos) return
        const v = this._Get3DVol(pos)
        // console.log('传入位置', pos, v)
        this._PlayBuffSound(name, v, 0.3)
    }
    
    /**
     * 
     * @param {String} name 
     */
    SoundEffectNoRate(name){
        this._PlayBuffSound(name, 1, 0)
    }
    
    SoundEffect3D_NoRate(name, pos){
        if (!this.data.earPos) return
        const v = this._Get3DVol(pos)
        this._PlayBuffSound(name, v, 0)
    }
}