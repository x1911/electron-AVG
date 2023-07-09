import U_Entity from "../frame/U_Entity.js";
import { U_System } from "../frame/U_System.js";
import C_Stage from "./C_Stage.js";
import U_Dialogue_Funcs from "./U_Dialogue_Funcs.js";

export default class{
        /**
     * @param {U_Entity} e 
     */
    constructor(e){
        this.dia = new U_Dialogue_Funcs(e)
        window.addEventListener('mousedown', this._MouseDown.bind(this), false)
        window.addEventListener('mouseup', this._MouseUp.bind(this))
        // window.addEventListener('click', this._Click.bind(this))
    }

    // _Click(e){ this.dia.ClickNext() }
    _MouseDown(e){ this.dia.SpeedUpSpeech() }
    _MouseUp(e){
        this.dia.EndDialogue()
    }
}