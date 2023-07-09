import ZUtils from "../libs/ZUtils.js";
import DataBus from "../settings/DataBus.js";
import Enum_C_Events from "../settings/Enum_C_Events.js";
import IF_JSON_Script from "../settings/IF_JSON_Script.js";
import C_Stage from "./C_Stage.js";
const DB = new DataBus()

export default class {
    /**
     * 
     * @param {C_Stage} st 
     * @param {IF_JSON_Script['内容']} contents 
     */
    static ShowChooseMenu(st, contents) {
        st.chooseMenu.style.opacity = '1'
        this._ShowBtn(st, true)
        // debugger
        for (let i = 0; i < 3; i++) {
            const cc = i + 1
            const btn = st['choose' + cc]
            
            if( !contents[i] ){  // 没有的选择
                btn.style.display = 'none'
                continue
            }
            btn.innerText = contents[i]['选项']
            btn.onclick = () => {  // 点击运行
                if( contents[i]['脚本'] ) this._RunScript( contents[i]['脚本'] )    
                st.chooseMenu.style.opacity = '0'  // 隐藏
                this._ShowBtn(st, false)
            }
        }
    }  // ShowChooseMenu

    static _ShowBtn(st, dis){
        const isShow = dis ? 'block' : 'none'
        for( let s=0; s<3; s++){
            const cc = s + 1
            st['choose' + cc].style.display = isShow
        }
    }

    /** 运行脚本 */
    static async _RunScript(txt){
        // console.log('点击运行', txt)
        const ans = await ZUtils.LoadJson(txt)
        DB.event.Dispatch( Enum_C_Events.LOAD_JSON_SCRIPT, ans )
    }
}