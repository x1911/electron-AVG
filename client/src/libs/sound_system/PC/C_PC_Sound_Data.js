
export default class {
    constructor() {
        const listener = new THREE.AudioListener();   // 创建一个听者，加入到相机上
        // DB.scene && DB.scene.camera.add(listener);  // 放这里可能启动无效要放到外面
        this.listener = listener

        // 带进度条消失不掉
        // const mm = DB.loader ? DB.loader.manager : undefined
        this.audioLoader = new THREE.AudioLoader();  // 读取

        /** 背景音乐控制 */
        this.bgMusic = new THREE.Audio(listener);

        /** 音效控制 */
        // this.sound = new THREE.Audio(listener);
        this.sound = null
        
        /** 多个声道 */
        this.soundChannels = [
            new THREE.Audio(listener),
            new THREE.Audio(listener),
            new THREE.Audio(listener),
            new THREE.Audio(listener),
            new THREE.Audio(listener),
            new THREE.Audio(listener),
        ]
        
        this.soundPlayIndex = 0

        /** 存音效 */
        this.buffs = new Map()

        /** 存音频位置，只有pc才需要 */
        this.url = ''
    }

    /**
 * 
 * @param {String} url 
 * @returns {Promise<String>}
 */
    LoadOne(url) {
        return new Promise((res, rej) => {
            this.audioLoader.load(url, (buffer) => {
                // console.warn('读取到声音', buffer)
                res(buffer)
            }, 
            () => {},
            e =>{
                rej(e)
            })
        })  // promise
    } // load

}