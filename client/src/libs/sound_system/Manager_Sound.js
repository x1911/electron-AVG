// @ts-check
import S_Sound_iOS from "./iOS/S_Sound_iOS.js"
import S_Sound_PC from "./PC/S_Sound_PC.js"
import { U_iOS_Func } from "./iOS/U_iOS_Func.js"
import C_Sound_Data from "./C_Sound_Data.js"
import C_PC_Sound_Data from "./PC/C_PC_Sound_Data.js"
import S_Sound_Load from "./PC/S_Sound_Load.js"
import S_AD_iOS from "./iOS/S_AD_iOS.js"
import S_iOS_Native from "./iOS/S_iOS_Native.js"
import { Enum_PLAY_MODES } from "./Enum_PLAY_MODES.js"
// import { IF_Vec3 } from "../../frame/utils/IF_Basic.js"

let instance

/** 2022.6.27 重写声音控制 */
export default class {
    constructor() {
        if( instance ) return instance
        instance = this
        
        this.data = {
            sound: new C_Sound_Data(),
            /** @type {C_PC_Sound_Data} */
            pcData: null,
        }
        
        // console.log('判断是否ios', U_iOS_Func.checkisIos())
        if (U_iOS_Func.checkisIos()) {
            this.system = new S_Sound_iOS( this.data )
            this.ad = new S_AD_iOS()   // 广告功能
            this.native = new S_iOS_Native()   // iOS 原生功能
            
        } else {
            this.data.pcData = new C_PC_Sound_Data()   // 启动的各个数据
            // const url = f || SoundUrl.url()
            this.loader = new S_Sound_Load( this.data )
            this.system = new S_Sound_PC( this.data )
        }
     
        // if( this.system.Start ) this.system.Start()
    }   
    
    /** 设置基础耳朵距离
     * @param {THREE.Vector3} v  设置耳朵距离
     */
    set earPos(v){
        this.data.sound.earPos = v
    }
    
    set listener(v){
        if( U_iOS_Func.checkisIos() ) return
        v.add( this.data.pcData.listener )
        // if( !DB.scene ) return
        // if( !DB.scene.camera ) return
        // DB.scene.camera.add( this.data.pcData.listener )
    }
    
    /** 设置PC端地址 */
    set pcUrl(v){
        if( U_iOS_Func.checkisIos() ) return
        this.data.pcData.url = v
    }
    
    
    /**
     * 根据类型播放
     * @param  {Object} opt 
     * @param {Enum_PLAY_MODES} opt.soundType 
     * @param {String | any} opt.soundName
     * @param {Number=} opt.vol
     * @param { (THREE.Vector3 | IF_Vec3)= } opt.pos
     */
    async TypePlay(opt){
        if( opt.soundType === Enum_PLAY_MODES.MUSIC_LOOP ) this.system.MusicLoopPlay( opt.soundName, opt.vol )
        else if( opt.soundType === Enum_PLAY_MODES.VOICE ) await this.system.SoundPlay( opt.soundName, opt.vol )
        else if( opt.soundType === Enum_PLAY_MODES.VOICE_3D ) this.system.SoundPlay3D( opt.soundName, opt.pos )
        else if( opt.soundType === Enum_PLAY_MODES.EFFECT ) this.system.SoundEffect( opt.soundName )
        else if( opt.soundType === Enum_PLAY_MODES.EFFECT_3D ) this.system.SoundEffect3D( opt.soundName, opt.pos )
        else if( opt.soundType === Enum_PLAY_MODES.EFFECT_NO_RATE_CHANGED ){
            this.system.SoundEffectNoRate( opt.soundName )
        }
        else if( opt.soundType === Enum_PLAY_MODES.EFFECT_3D_NO_RATE_CHANGED ){
            this.system.SoundEffect3D_NoRate( opt.soundName, opt.pos )
        }
        else console.warn('sound type no exist', opt)
    }
    
}