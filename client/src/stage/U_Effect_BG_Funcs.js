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
     * @param {[number]} val2  结束数值数组
     */
    static BGEffect(cst, bgFileName, type, val, val2){
        if( type === Enum_BGChangeTypes.Scale)
    }
}