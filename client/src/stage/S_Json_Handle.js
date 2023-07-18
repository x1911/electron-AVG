// @ts-check
import U_Entity from "../frame/U_Entity.js";
import { U_System } from "../frame/U_System.js";
import ZUtils from "../libs/ZUtils.js";
import DataBus from "../settings/DataBus.js";
import Enum_C_Events from "../settings/Enum_C_Events.js";
import IF_JSON_Script from "../settings/IF_JSON_Script.js";
import C_Dialogue from "./C_Dialogue.js";
import C_Stage from "./C_Stage.js";
import U_Change_BG_Funcs from "./U_Change_BG_Funcs.js";
import U_Choose_Manager from "./U_Choose_Manager.js";
import U_Dialogue_Funcs from "./U_Dialogue_Funcs.js";
import U_JSON_Manager from "./U_JSON_Manager.js";
import U_Sound_Manager from "./U_Sound_Manager.js";
const DB = new DataBus()

export default class extends U_System{
    /**
     * 
     * @param {U_Entity} e 
     */
    constructor(e){
        super('JSON handle')
        this.st = e.GetComponent(C_Stage)
        this.diaData = e.GetComponent(C_Dialogue)
        this.dia = new U_Dialogue_Funcs( e )

        DB.event?.On( Enum_C_Events.LOAD_JSON_SCRIPT, this._HandleJsonData, this)
        this.Start()
    }

    async Start(){
        // const name = '很多马嘶声'
        const name = '序章'
        const ans = await ZUtils.LoadJson( name )
        // this.stage.dialogue.innerText = ans
        // debugger
        await this._HandleJsonData( ans )
    }

    /**
     * 
     * @param {Array< IF_JSON_Script >} ans 
     */
    //  * @param {(function(): void)=} OnEnded 结束时调用 
    async _HandleJsonData(ans){
        
        for(let i of ans){
            if( this.diaData.isBreakLoop ){  // 打断循环功能
                // debugger
                U_JSON_Manager.RemoveAll( this.st )
                DB.event.Dispatch(Enum_C_Events.UI_MSG, '游戏停止')
                break
            } 
            // console.log('1111111-----', i['指令'], i['角色'])
            const time = parseFloat( i['等待'] )
            if( i['指令'] === '清空') U_JSON_Manager.RemoveAll( this.st )
            else if( i['指令'] === '文字') await this.dia.ShowDialogu( i['角色'], i['内容'])
            else if( i['指令'] === '立绘') U_JSON_Manager.ShowCharacter( this.st, i['位置'], i['资源'])
            // - 移动立绘
            else if( i['指令'] === '声音') await U_Sound_Manager.PlaySound( i['资源'], time)
            else if( i['指令'] === '音乐') U_Sound_Manager.PlayMusic( i['资源'])
            // else if( i['指令'] === '移动背景') 
            else if( i['指令'] === '选项'){
                U_JSON_Manager.HideDialogue( this.st )
                U_Choose_Manager.ShowChooseMenu( this.st, i['内容'])
            } 

            else if( i['指令'] === '背景') U_JSON_Manager.ShowBg( this.st, i['资源'])
            else if( i['指令'] === '切换背景') U_Change_BG_Funcs.ChangeBG( this.st, i['资源'], i['类型'])
        }// for
    }
}