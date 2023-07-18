// @ts-check
import ZUtils from "../libs/ZUtils.js";
import DataBus from "../settings/DataBus.js";
import Enum_C_Events from "../settings/Enum_C_Events.js";
import Enum_BGChangeTypes from "../settings/Enum_BGChangeTypes.js";
import IF_JSON_Script from "../settings/IF_JSON_Script.js";
import St_URL from "../settings/St_URL.js";
import C_Stage from "./C_Stage.js";
import core from "../libs/core.js";
const DB = new DataBus()
/** @type {C_Stage} */
let st

export default class {
    /**
     * 
     * @param {C_Stage} cst 
     * @param {string} bgFileName 
     * @param {@enum<Enum_BGChangeTypes>} type 
     */
    static async ChangeBG(cst, bgFileName, type){
        if( !st ) st = cst 
        const uu = St_URL.BGFolder + bgFileName + '.jpg'   // 设置背景
        st.bg2.style.opacity = '0'
        st.bg2.style.backgroundImage = `url('${uu}')`
        if( type === Enum_BGChangeTypes.FadeInOut ) await this._FadeInOut()
        else if( type === Enum_BGChangeTypes.GradientTopIn ) await this._GradientTopIn()
        else if( type === Enum_BGChangeTypes.GradientBottomIn ) await this._GradientBottomIn()
        else if( type === Enum_BGChangeTypes.GradientLeftIn ) await this._GradientLeftIn()
        else if( type === Enum_BGChangeTypes.GradientRightIn ) await this._GradientRightIn()
        else if( type === Enum_BGChangeTypes.RadialCenter ) await this._RadialCenter()
        else if( type === Enum_BGChangeTypes.ReduceCenter ) await this._ReduceCenter()
        this._ResetImg()
    }

    /** 中心收缩 */
    static async _ReduceCenter(){
        await core.sleep(0.1)
        const {bg1, bg2} = st

        const url = bg2.style.backgroundImage  // 要切换的图
        // bg2.style.backgroundImage = bg1.style.backgroundImage  //切换成原图
        // bg2.style.opacity = '1' 
        // bg1.style.backgroundImage = url
        // bg2.style.webkitMaskImage = `radial-gradient( #fff 0%, transparent 300%)`

        
        const ss = bg1
        ss.style.transition = 'all 0.5s'
        for(let i = 20; i >= 0; i-- ){
            await core.sleep(0.05)
            const v = i * 10
            ss.style.webkitMaskImage = `radial-gradient( #fff 0%, transparent ${ v }%)`
        }
        bg1.style.backgroundImage = url
        await core.sleep(0.3)
        bg1.style.webkitMaskImage = ''
    }

    /** 中心放射效果 */
    static async _RadialCenter(){
        // await core.sleep(0.2)
        const {bg2} = st
        bg2.style.webkitMaskImage = `radial-gradient( #fff 0%, transparent 3%)`
        bg2.style.opacity = '1' 
        bg2.style.transition = 'all 0.5s'
        for(let i = 1; i <= 20; i ++ ){
            await core.sleep(0.05)
            const v = i * 10
            bg2.style.webkitMaskImage = `radial-gradient( #fff 0%, transparent ${ v }%)`
        }
        // await core.sleep(0.2)
    }
    
    static async _GradientRightIn(){
        const {bg2} = st
        bg2.style.transform = 'translate(100vw, 0)'
        bg2.style.webkitMaskImage = 'linear-gradient(270deg, #fff, transparent)'
        await this._Bg2Reset()
    }

    static async _GradientLeftIn(){
        const {bg2} = st
        bg2.style.transform = 'translate(-100vw, 0)'
        bg2.style.webkitMaskImage = 'linear-gradient(90deg, #fff, transparent)'
        await this._Bg2Reset()
    }
    
    static async _GradientBottomIn(){
        const {bg2} = st
        bg2.style.transform = 'translate(0, 100vh)'
        bg2.style.webkitMaskImage = 'linear-gradient( transparent, #fff )'
        await this._Bg2Reset()
    }

    /** 上方渐变 */
    static async _GradientTopIn(){
        const {bg2} = st
        bg2.style.transform = 'translate(0, -100vh)'
        bg2.style.webkitMaskImage = 'linear-gradient(#fff, transparent)'
        // -webkit-mask-position-y: -10vh;
        // bg2.style.webkitMaskPosition = '0 -100vh'
        await this._Bg2Reset()
    }

    static async _Bg2Reset(){
        const {bg2} = st
        await core.sleep(0.2)
        bg2.style.opacity = '1' 
        bg2.style.transform = 'translate(0, 0)'
        // bg2.style.webkitMaskPosition = '0 100vh'
        bg2.style.transition = 'all 1s'
        await core.sleep(1)
    }
    
    /** 渐变 */
    static async _FadeInOut(){
        const {bg2} = st
        bg2.style.opacity = '1'       
        bg2.style.transition = 'all 1s' 
        await core.sleep(1)
        // debugger
    }
    
    
    static async _ResetImg(){
        const {bg1, bg2} = st
        bg1.style.backgroundImage = bg2.style.backgroundImage
        await core.sleep(0.5)
        bg2.style.opacity = '0'        
        await core.sleep(0.5)
    }
}