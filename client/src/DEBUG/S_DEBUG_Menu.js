import U_Entity from "../frame/U_Entity.js";
import { U_System } from "../frame/U_System.js";
import ZUtils from "../libs/ZUtils.js";
import DataBus from "../settings/DataBus.js";
import Enum_BGChangeTypes from "../settings/Enum_BGChangeTypes.js";
import Enum_C_Events from "../settings/Enum_C_Events.js";
import C_Dialogue from "../stage/C_Dialogue.js";
import C_Stage from "../stage/C_Stage.js";
import U_Change_BG_Funcs from "../stage/U_Change_BG_Funcs.js";
import U_Effect_BG_Funcs from "../stage/U_Effect_BG_Funcs.js";
import C_DEBUG_Menu from "./C_DEBUG_Menu.js";
import U_DEBUG_BGMenu from "./U_DEBUG_BGMenu.js";
const DB = new DataBus()

export default class extends U_System {
    /**
     * @param {U_Entity} e 
     */
    constructor(e) {
        super('DEBUG system')
        this.debug = e.GetComponent(C_DEBUG_Menu)
        this.diaData = e.GetComponent(C_Dialogue)
        this.cst = e.GetComponent(C_Stage)
        this._Init()
        DB.event.On(Enum_C_Events.UI_MSG, this._ShowErr, this)
    }



    _Init() {
        if (!DB.DEBUG) return

        const { bgMenu, errMsg, closeBtn } = this.debug
        U_DEBUG_BGMenu.MakeErrMsg(errMsg)  // 设置错误提示信息
        U_DEBUG_BGMenu.MakeBG(bgMenu, closeBtn)  // 设置debug

        // 错误按钮
        this._AddBtn('停止游戏后才能载入新脚本', () =>{
            this.diaData.isBreakLoop = true
            DB.event.Dispatch(Enum_C_Events.UI_MSG, '游戏即将在对话结束后停止')   
        })

        // 读取按钮
        this.debug.loadScriptBtn = ZUtils.LoadJsonBtn(e => {
            this.diaData.isBreakLoop = false
            DB.event.Dispatch(Enum_C_Events.LOAD_JSON_SCRIPT, e)
        })
        const vv = document.createElement('div')
        vv.innerText = '载入脚本：'
        bgMenu.appendChild(vv)
        bgMenu.appendChild(this.debug.loadScriptBtn)  // 加入到debug menu


        
        
        this._AddBtn('切换背景', () => {
            U_Change_BG_Funcs.ChangeBG( this.cst, '大城门-黄昏', Enum_BGChangeTypes.ReduceCenter)
            // U_Change_BG_Funcs.ChangeBG( this.cst, '大城门-夜晚', Enum_BGChangeTypes.RadialCenter)
            // U_Change_BG_Funcs.ChangeBG( this.cst, '大城门-夜晚', Enum_BGChangeTypes.GradientBottomIn)
            // U_Change_BG_Funcs.ChangeBG( this.cst, '大城门-夜晚', Enum_BGChangeTypes.GradientLeftIn)
            // U_Change_BG_Funcs.ChangeBG( this.cst, '大城门-夜晚', Enum_BGChangeTypes.GradientTopIn)
            // DB.event.Dispatch(Enum_C_Events.CHANGE_BG, '大城门-黄昏', Enum_BGChangeTypes.FadeInOut)
        })
        
        this._AddBtn('背景特效', () => {
            U_Effect_BG_Funcs.BGEffect(this.cst, null, Enum_BGChangeTypes.Scale, [8, 1, 3])
        })

        this._AddBtn('重载游戏', () => window.location.reload())
        // this._AddBtn('显示错误', () => DB.event.Dispatch(Enum_C_Events.UI_MSG, 'askdfhsakfh'))
    }

    _AddBtn(txt, cb) {
        const btn = document.createElement('button')
        btn.innerText = txt
        btn.onclick = () => {
            cb && cb()
        }
        this.debug.bgMenu.appendChild(btn)
    }


    _ShowErr(txt) {
        const { errMsg } = this.debug
        errMsg.style.display = 'block'
        errMsg.innerText = txt
        setTimeout(() => {
            errMsg.style.display = 'none'
        }, 2000)
    }
}