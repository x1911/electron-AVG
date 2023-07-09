/** @enum {number} 播放的方式 */
export const Enum_PLAY_MODES = Object.freeze({
    MUSIC_LOOP: 1,   // 背景音
    VOICE: 2,    // 普通播放一次的声音 
    VOICE_3D: 3,   // 3D播放普通声音
    EFFECT: 4,   // 特效音 会变调   是缓存可以同时多个播放的音频
    EFFECT_3D: 5,   // 特效音3D 会变调
    
    EFFECT_NO_RATE_CHANGED: 6,   // 不变调的特效音 较少用
    EFFECT_3D_NO_RATE_CHANGED: 7,   // 不变调的3D特效音 较少用

})