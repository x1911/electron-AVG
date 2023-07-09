import { U_iOS_Func } from "./U_iOS_Func.js"
import U_Purchase_Indicator from "./U_Purchase_Indicator.js"

/** 分享模块 */
export const IF_iOS_Share_Schema = Object.freeze({
    name: 'share',
    text: '',  // 分享内容
    // img: '',   // 图片地址  弃用，分享自己的app图标
    url: '',
})

let instance
export default class {
    constructor() {
        if( instance ) return instance
        instance = this
        
        /** @type {U_Purchase_Indicator} */
        this.ind = null
        
        this.callbacks = {
            /** @type {function(): Promise<Boolean> } 服务器回调 在下面Share 调用 */
            OnShareComplete: null,

            /** @type {function(): Promise<Boolean> } iOS 购买回调 在下面购买 调用 */
            OnPurchased: null,
            
            /** @type {function(): Promise<Boolean> } iOS 恢复旧购买回调 在下面恢复 调用 */
            OnResetoreOldPurchasesDone: null,
        }

        /** 给外部修改的， iOS 控制的 暂停函数 */
        this.GamePause = () => { console.log('游戏暂停') }

        window.OnResetoreOldPurchasesDone = v => this.callbacks.OnResetoreOldPurchasesDone(v)  // 恢复购买
        window.OnPurchased = v => this.callbacks.OnPurchased(v)  // 发起购物
        window.OnShareComplete = (v) => this.callbacks.OnShareComplete(v)  // 分享结束
        window.GamePause = () => this.GamePause()   // 游戏暂停
    }

    /**
     * 警告
     * @param {String} txt 
     */
    Alert(txt){
        U_iOS_Func.SendMsg('alert', {
            name: 'alert',   // 要发送name才生效
            msg: txt
        })
    }

    /** 恢复之前的购买 */
    ResetoreOldPurchases(){
        return new Promise(res => {
            if( !this.ind ) this.ind = new U_Purchase_Indicator()
            this.ind.Show( true )  // 显示读取指示器
            
            this.callbacks.OnResetoreOldPurchasesDone = d => {
                this.ind.Show( false )  // 隐藏指示器
                console.log('恢复购买的到的ID', d)
                // 恢复成功返回ID，否则返回 '' 空字符串
                res( d.length > 0 )  
            }
            U_iOS_Func.SendMsg('resetoreOldPurchases', {
                name: 'resetoreOldPurchases',   // 要发送name才生效
                // productID
            })
        })
    }
    
    
    /**
     * 唤醒IAP购买
     * @param {String} productID 购买的产品id
     */
    CallPurchase(productID) {
        return new Promise(res => {
            if( !this.ind ) this.ind = new U_Purchase_Indicator()
            this.ind.Show( true )  // 显示读取指示器
            
            this.callbacks.OnPurchased = d => {
                this.ind.Show( false )  // 隐藏指示器
                // 购买成功返回ID，否则返回 '' 空字符串
                res( d.length > 0 )  
            }
            U_iOS_Func.SendMsg('callPurchase', {
                name: 'callPurchase',   // 要发送name才生效
                productID
            })
        })
    }

    /**
     * 
     * @param {Number} score 提交分数
     * @returns 
     */
    SubmitScore(score) {
        if (!score) return
        U_iOS_Func.SendMsg('submitScore', {
            name: 'submitScore',
            score
        })
    }

    /**
     * 显示排行榜
     */
    ShowRank() {
        U_iOS_Func.SendMsg('showGameCenter', {
            name: 'showGameCenter',
        })
    }

    /**
 * 分享
 * @param {String} text 分享文字
 * @param {String} img 分享图片链接
 * @param {String} url 分享网站链接
 * @returns {Promise<Boolean>}
 */
    Share(text, img, url) {
        return new Promise((res, rej) => {
            this.callbacks.OnShareComplete = (d) => {
                // console.log('接收到分享结果', d, d === '1')
                res(d === '1')
            }

            const msg = { ...IF_iOS_Share_Schema }
            msg.text = text
            if (img) msg.img = img
            msg.url = url
            U_iOS_Func.SendMsg("share", msg)
        })
    }

}