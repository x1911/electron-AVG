import {U_Manager} from "./frame/U_Manager.js"
import U_Entity from "./frame/U_Entity.js"
import C_Stage from "./stage/C_Stage.js"
import C_Dialogue from "./stage/C_Dialogue.js"
import S_Stage_Basic from "./stage/S_Stage_Basic.js"
import S_Json_Handle from "./stage/S_Json_Handle.js"
import S_Input from "./stage/S_Input.js"

export default class extends U_Manager{
    constructor(){
        super('game')
        const e = new U_Entity()
        e.AddComponent( C_Stage )
        e.AddComponent( C_Dialogue )

        this.AddSystem( S_Stage_Basic, e )
        this.AddSystem( S_Json_Handle, e )
        this.AddSystem( S_Input, e )
    }

}