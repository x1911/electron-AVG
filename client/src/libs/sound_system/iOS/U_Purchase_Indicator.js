// @ts-check

/**
 * iOS购买指示器，防止点击后长时间无响应
 */
let instance
export default class {
    constructor() {
        if (instance) return instance
        instance = this

        /** @type {HTMLDivElement} 指示器 */
        this.indicator = this._AddIndicator()

        /** @type {HTMLDivElement} 错误提示 */
        this.errorDom = this._AddErrorLabelDom()

        /** @type {HTMLDivElement} 背景 */
        this.bg = this._MakeBG()

        this.bg.appendChild(this.indicator)
        this.bg.appendChild(this.errorDom)
        document.body.appendChild(this.bg)
    }

    RemoveSelf() {
        if (!this.bg) return
        this.bg.parentNode.removeChild(this.bg)
        this.bg = null
        this.indicator = null
    }

    /**
     * 是否显示
     * @param {Boolean} v 
     */
    Show(v) {
        this.errorDom.style.display = 'none'   // 隐藏错误，只显示读取
        this.indicator.style.display = v ? 'block' : 'none'
        this.bg.style.display = v ? 'flex' : 'none'
    }

    /**
     * 提示错误信息
     * @param {String} msg 
     */
    ShowError(msg) {
        this.errorDom.label.innerText = msg
        this.errorDom.style.display = 'block'   // 显示错误信息
        this.indicator.style.display = 'none'   // 读取条不显示
        this.bg.style.display = 'flex'
    }

    /**
 * @returns {HTMLDivElement}
 */
    _AddErrorLabelDom() {
        const dom = document.createElement('div')
        const label = document.createElement('div')  // 提示信息按钮
        dom.appendChild( label )
        const btn = document.createElement('div')  // 关闭按钮
        btn.innerText = 'OK'
        btn.onclick = () => this.Show( false )   // 点击关闭
        dom.appendChild( btn )
        
        // 设置样式
        label.style.cssText = `
        color: #f1f1f1;
        font-weight: 300;
        font-size: 28px;
        padding: 10px 0;
        `
        btn.style.cssText = `
        width: 100px;
        color: #eee;
        font-weight: 300;
        font-size: 16px;
        margin: 10px auto 0;
        padding: 8px 30px;
        border: 1px solid #ccc;
        border-radius: 50px;
        `
        
        dom.label = label
        return dom
    }

    /**
     * @returns {HTMLDivElement}
     */
    _AddIndicator() {
        // 加一个旋转的指示
        const indicator = document.createElement('div')
        indicator.className = 'purchase_indicator'
        indicator.style.cssText = `
                width: 68px;
                height: 68px;
                margin: 0 auto;
                border: 5px solid #FFF;
                border-radius: 50%;
                border-bottom-color: #888;
                animation: rot360 2s linear 0s infinite;
                            `
        // lt.appendChild(indicator)
        // this._bg = document.querySelector('.bg') || this._makeBG()
        // this._bg.appendChild(indicator)
        // this._indicator = indicator
        return indicator
    }

    _MakeBG() {
        // if (this.isWorker) return
        // if(document.querySelector('.bg')) return
        const dom = document.createElement('div')
        dom.style.cssText = `
                width: 90vw;
                height: 30vh;
                text-align: center;
                background: rgba(0,0,0, 0.6);
                border-radius: 30px;
                box-shadow: 0 -1px 1px #555, 0 3px 15px #111, 0 6px 50px #555;
                padding: 10vh 0;
                position: absolute;
                top: 30vh;
                left: 5vw;
                z-index: 90;
                display: flex;
                flex-direction: column;
                justify-content: center;
                transition: all 1s;
                `
        // dom.className = 'bg'

        return dom
    }

}