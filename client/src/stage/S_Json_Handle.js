// @ts-check
import U_Entity from "../frame/U_Entity.js";
import { U_System } from "../frame/U_System.js";
import ZUtils from "../libs/ZUtils.js";
import C_Stage from "./C_Stage.js";
import U_Dialogue_Funcs from "./U_Dialogue_Funcs.js";
import U_JSON_Manager from "./U_JSON_Manager.js";

export default class extends U_System{
    /**
     * 
     * @param {U_Entity} e 
     */
    constructor(e){
        super('JSON handle')
        this.st = e.GetComponent(C_Stage)

        this.dia = new U_Dialogue_Funcs( e )
        this.Start()
    }

    async Start(){
        const ans = await ZUtils.LoadJson('序章')
        // this.stage.dialogue.innerText = ans
        for(let i of ans){
            if( i['指令'] === '清空') U_JSON_Manager.RemoveAll( this.st )
            else if( i['指令'] === '文字') await this.dia.ShowDialogu( i['角色'], i['内容'])
            else if( i['指令'] === '立绘') U_JSON_Manager.ShowCharacter( this.st, i['位置'], i['资源'])
            // - 移动立绘
            else if( i['指令'] === '背景') U_JSON_Manager.ShowBg( this.st, i['资源'])
            // else if( i['指令'] === '移动背景') 
        }
        // debugger
    }
}