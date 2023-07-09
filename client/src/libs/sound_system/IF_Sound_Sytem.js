
/** 虚类，提供给音频调用 */
export default class {
    constructor() {
    }


    /** @param {String} n 基础声音播放 用于UI等 */
    SoundPlay(n, v) { }

    /** @param {String} n 3D声音播放 语音 */
    SoundPlay3D(n) { }

    /** @param {String} n 变调声音播放 脚步声等玩家自身效果 */
    SoundEffect(n) { }

    /** @param {String} n 3D变调声音播放 周边敌人效果 */
    SoundEffect3D(n) { }


    /** @param {String} n 背景音乐播发 */
    MusicLoopPlay(n) { }

    /** @param {String} n 背景音乐暂停 */
    MusicLoopStop(n) { }


    /** @param {String} n 背景音乐音量降低 打开菜单的时候 */
    MusicVolDown(n) { }


    /** @param {String} n 背景音乐音量恢复 关闭菜单的时候 */
    MusicVolRecover(n) { }

    /** @type {function(Number)} 震动 */
    Vibrat(n) { }

}