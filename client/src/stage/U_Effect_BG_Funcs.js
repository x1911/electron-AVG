// @ts-check
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

export default class{
        /**
     * 
     * @param {C_Stage} cst 
     * @param {string} bgFileName 背景图片，可以为空
     * @param {Enum_BGChangeTypes.} type 变换类型
     * @param {[number]} val  起始的数值数组
     */
    static async BGEffect(cst, bgFileName, type, val=[]){
        const {bg1} = cst
        if( bgFileName ){  // 要换背景图的情况 
            const uu = St_URL.BGFolder + bgFileName + '.jpg'   // 设置背景
            bg1.style.backgroundImage = `url('${uu}')`
        }
        bg1.style.transition = 'none'
        if( type === Enum_BGChangeTypes.Scale) await this._Scale(cst, val)
    }
    
    /**
     * @param {C_Stage} cst 
     * @param {[number]} v1 
     */
    static async _Scale(cst, v1){
        const {bg1} = cst
        let startScale = v1[0] || 2
        let endScale = v1[1] || 2
        const time = v1[2] || 1
        bg1.style.transform = `scale(${ startScale })`
        await core.sleep(0.1)
        bg1.style.transform = `scale(${ endScale })`
        bg1.style.transition = `all ${ time }s` 
        await core.sleep( time )
    }
}