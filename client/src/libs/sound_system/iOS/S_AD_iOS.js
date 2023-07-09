import { U_iOS_Func } from "./U_iOS_Func.js"
import U_Purchase_Indicator from "./U_Purchase_Indicator.js"

let instance
export default class {
    constructor() {
        if (instance) return instance
        instance = this

        /** @type {U_Purchase_Indicator} 广告错误提示 */
        this.ind = null
        
        this.callbacks = {
            /** @type {function(): Promise<Boolean> } */
            isADReadyCallback: null,
            AdOpen: null,
            /** @type {function(): Promise<Number> } 会返回一个 */
            AdVideoComplete: null
        }

        this.init()
    }

    init() {
        // 2021.6.20 判断广告是否完成
        window.isADReadyCallback = (d) => this.callbacks.isADReadyCallback(d)
        /** 打开广告 */
        window.AdOpen = () => this.callbacks.AdOpen()
        // 2021.6.22 广告看完
        window.AdVideoComplete = (v) => this.callbacks.AdVideoComplete(v)
    }


    OpenVideoAD() {
        return new Promise((res, rej) => {
            
            let time = 0
            this.callbacks.AdOpen = () => {
                time = Date.now()
                // console.log('广告显示', time)
            }
            this.callbacks.AdVideoComplete = () => {
                let diff = Date.now() - time
                diff = Math.round(diff / 1000)
                // console.log('看片时间', diff, '秒')
                res(diff)
            }
            // console.log('点击广告', time)
            U_iOS_Func.SendMsg("playAD")
        })
    }

    /**
     * 判断AD是否完成
     * @returns {Promise<Boolean>}
     */
    IsAdReady() {
        return new Promise((res, rej) => {
            this.callbacks.isADReadyCallback = (d) => {
                // console.log('接收到回复', d)
                res(d === '1')
            }
            U_iOS_Func.SendMsg("isADReady")
        })
    }
    
    
    async OpenRewardAD(){
        // console.log('检查广告')
        const isAd = await this.IsAdReady()
        if(!isAd) throw Error('AD not Ready')
        // console.log('播放广告')
        const time = await this.OpenVideoAD()
        if( time < 6 ) throw Error('time too short')
        return time
    }

    ShowError(msg){
        if( !this.ind ) this.ind = new U_Purchase_Indicator()
        this.ind.ShowError( msg )  // 显示读取指示器
    }
}