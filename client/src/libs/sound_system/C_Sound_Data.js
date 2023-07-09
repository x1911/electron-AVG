
export default class{
    constructor(){
        this.vol = 0   // 给播发声音用到的临时变量
        this.bgVol = 0  // 给背景的临时变量
        
        /** 背景音乐播放的名字 */
        this.bgMusicName = ''
        
        
        /** 3D 音效能听到的最远距离 */
        this.maxDistance = 500
        /** @type {THREE.Vector3} 外部传入耳朵位置用于判断方位 */
        this.earPos = null
        /** 判断距离用到的变量 */
        this.v = new THREE.Vector3()
        /** 和耳朵的距离 */
        this.dis = 0
    }
    
    get sfxVolume(){
        return DB.setting.sfxVolume || 0.5
    }
    
    get isPlayBg(){ return DB.setting.isPlayBg }  // 是否播放背景音乐
    get bgVolume(){ return DB.setting.bgVolume || 0.5 }  // 背景音乐音量
    get isPlaySfx(){ return DB.setting.isPlaySfx }  // 是否播放音效
    get sfxVolume(){ return DB.setting.sfxVolume }  //音效音量
    get vibrate(){ return DB.setting.vibrate || false }  //音效音量
}