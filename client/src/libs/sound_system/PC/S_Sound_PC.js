import C_Sound_Data from "../C_Sound_Data.js";
import IF_Sound_Sytem from "../IF_Sound_Sytem.js";
import C_PC_Sound_Data from "./C_PC_Sound_Data.js";


export default class extends IF_Sound_Sytem {

    /**
 * @param {Object} o
 * @param {C_Sound_Data} o.sound
 * @param {C_PC_Sound_Data} o.pcData
 */
    constructor(o = {}) {
        super()
        this.pc = o.pcData
        this.data = o.sound
    }

    /**
* 循环背景音
* @param {string} name 
* @param {number} vol 
* @returns 
*/
    async MusicLoopPlay(name, vol = 1) {
        if (!name) return console.warn('no bg sound name', name)
        if (!this.data.isPlayBg) return  // 2021.6.14 加入是否播放声音
        this.data.bgVol = vol * this.data.bgVolume   // 乘以一个设置声音
        // console.log('循环播放背景音', name, vol)

        try{
            
            // this.pc.bgMusic.pause()
            if (this.data.bgMusicName) this.pc.bgMusic.stop()   // 无论如何都关闭
            this.data.bgMusicName = name
            
            const link = this.pc.url + name + '.mp3'
            // const buffer = await this.pc.bgMusic.load(link)
            let buffer
            if (this.pc.buffs.has(name)) {
                buffer = this.pc.buffs.get(name)
                console.log('有缓存内容')
            }
            else {
                buffer = await this.pc.LoadOne(link)
                this.pc.buffs.set(name, buffer)
            }
            this.pc.bgMusic.setBuffer(buffer);
            this.pc.bgMusic.setLoop(true);
            this.pc.bgMusic.setVolume(this.data.bgVol);  // 0.5
            this.pc.bgMusic.play()
        }
        catch(e){
            console.warn(e)
        }
    }


    /** 停止背景音乐 */
    MusicLoopStop() {
        try{   // 有可能有读不出音乐的情况
            if(this.data.bgMusicName) this.pc.bgMusic.stop()
        }
        catch(e){ }
        this.data.bgMusicName = null
    }

    /** 降低声音 */
    MusicVolDown() {
        if (!this.data.bgMusicName) return

        const vol = Math.max((this.data.bgVol / 3), 0.3)
        this.pc.bgMusic.setVolume(vol);  // 0.5
    }

    /** 恢复声音 */
    MusicVolRecover() {
        if (!this.data.bgMusicName) return
        this.pc.bgMusic.setVolume(this.data.bgVol);  // 0.5
    }

    _RandomRate(rate) {
        const r = 800 * rate
        const rr = Math.random() * r * 2 - r
        // console.log('得到的德努', rr)
        return Math.floor(rr)
    }

    /** 普通声音播放 UI等不变调 */
    async SoundPlay(name, vol = 1, rate = 0) {
        if (!this.data.isPlaySfx) return
        // if (!this.pc.buffs.has(name)) debugger
        if (!this.pc.buffs.has(name)){
            const link = this.pc.url + name
            const buffer = await this.pc.LoadOne(link)
            this.pc.buffs.set(name, buffer)
        }

        const buff = this.pc.buffs.get(name)
        // console.log('----------', name)

        this.data.vol = vol * this.data.sfxVolume  // 正常音量乘以比例
        this.data.vol = THREE.MathUtils.clamp(this.data.vol, 0.02, 0.9)  // 限制最大最小值
        if (isNaN(this.data.vol)) return console.error('not value', this.data.vol)

        
        this._FindAPlayChannel()
        // console.log('播放声音', name, vol, rate, this.pc.soundPlayIndex)
        this._PlaySound( buff, rate )
    }
    
    /** 多个声道切换 */
    _FindAPlayChannel(){
        this.pc.soundPlayIndex += 1
        this.pc.soundPlayIndex %= this.pc.soundChannels.length
        this.pc.sound = this.pc.soundChannels[ this.pc.soundPlayIndex]
    }
    
    /**
     * 播放声音，改成多声道播放  2022.8.26
     */
    _PlaySound(buff, rate){
        // return new Promise( res => {
            this.pc.sound.setBuffer(buff)  // 重复设buffer会导致位置不准
            // this.sound.updateMatrixWorld( true )  // 强制更新位置
            // const dt = rate === 0 ? 0 : this.tune
            // this.sound.detune = dt  // 修改速度以美分为单位。+/- 100 是半音。+/- 1200 是八度音阶。正快负慢
            this.pc.sound.detune = this._RandomRate(rate)  // 修改速度以美分为单位。+/- 100 是半音。+/- 1200 是八度音阶。正快负慢
            this.pc.sound.setVolume(this.data.vol)  // 设置声音
            // this.pc.sound.updateMatrixWorld(true)  // 不能改变
            // this.pc.sound.onEnded = (e) => {
                // console.log('end', e)
                // debugger
                // res()
            // }
            this.pc.sound.play()
        // })
    }

    /** 3D 播放不变调 */
    SoundPlay3D(name, pos) {
        // console.log('得到的距离值', name, pos)
        if (!this.data.earPos) return
        const v = this._Get3DVol(pos)
        this.SoundPlay(name, v)
    }

    _Get3DVol(pos) {
        this.data.v.set(pos.x, pos.y, pos.z)
        this.data.dis = this.data.earPos.distanceTo(this.data.v)
        this.data.dis = (this.data.maxDistance - this.data.dis) / this.data.maxDistance
        return this.data.dis
    }

    /** 普通播放特效音，变调 */
    SoundEffect(name) {
        const v = Math.random() * 0.4 + 0.6
        this.SoundPlay(name, v, 0.35)
    }

    /**
 * 播放3D特效音 变调
 * @param {String} name 声音名字 
 * @param {*} pos 
 * @returns 
 */
    SoundEffect3D(name, pos) {
        if (!this.data.earPos) return console.log('没有earPos')
        const v = this._Get3DVol(pos)
        // console.log('距离', v)
        this.SoundPlay(name, v, 0.35)
    }
    
    
    SoundEffectNoRate(name){
        this.SoundPlay(name, 1, 0)
    }
    
    SoundEffect3D_NoRate(name, pos){
        if (!this.data.earPos) return
        const v = this._Get3DVol(pos)
        this.SoundPlay(name, v, 0)
    }

}