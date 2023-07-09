// @ts-check
import core from "../libs/core.js";
import { Enum_PLAY_MODES } from "../libs/sound_system/Enum_PLAY_MODES.js";
import Manager_Sound from "../libs/sound_system/Manager_Sound.js";
import St_URL from "../settings/St_URL.js";
/** @type {Manager_Sound} */
let M_S


export default class {

    static get M(){
       if( !M_S ) M_S = new Manager_Sound()
       return M_S 
    }

    /**
     * 播放声音
     * @param {String} name 
     * @param {Number} sleepTime 
     */
    static async PlaySound(name, sleepTime) {
        console.warn('播放声音', name, sleepTime)
        this.M.pcUrl = St_URL.SoundFolder
        const opt = {
            soundType: Enum_PLAY_MODES.VOICE,
            soundName: name + '.ogg'
        }
        // await this.M.TypePlay(opt)
        this.M.TypePlay(opt)
        if( sleepTime){
            await core.sleep( sleepTime )
        } 
        // console.log('播放结束 --------', name)
    }
    
    /**
     * 播放背景音乐
     * @param {String} name 
    */
   static PlayMusic(name) {
        console.warn('播放音乐', name)
        this.M.pcUrl = St_URL.MusicFolder
        this.M.TypePlay({
            soundType: Enum_PLAY_MODES.MUSIC_LOOP,
            soundName: name
        })
    }
}