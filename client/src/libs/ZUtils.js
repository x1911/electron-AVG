import IF_JSON_Script from "../settings/IF_JSON_Script.js"
import St_URL from "../settings/St_URL.js"

export default class {

    /**
     * 
     * @param {function( Array<IF_JSON_Script> )} callback 
     * @returns {HTMLInputElement}
     */
    static LoadJsonBtn(callback) {
    
        const inp = document.createElement('input')
        // inp.value = '载入脚本'
        inp.type = 'file'
        inp.accept = "file/*,.json"
        // document.body.appendChild(inp)
        inp.onchange = async e => {

            // for (const f of e.currentTarget.files) {
            //     console.log('File(s) you dragged here: ', f.path)
            // }
            const f = e.currentTarget.files[0].path
            let langs = await fetch(f)
            langs = await langs.text()
            langs = JSON.parse(langs)
            // debugger
            callback(langs)
        }
        
        return inp
    }


    /**
     * 
     * @param {*} file 
     * @returns {Array<IF_JSON_Script>}
     */
    static async LoadJson(file) {
        try {
            const url = St_URL.JsonFolder + file + '.json'
            let langs = await fetch(url)
            langs = await langs.text()
            langs = JSON.parse(langs)
            return langs
        } catch (e) {
            console.warn('language error', e)
        }
    }


    /** 测试读取json */
    // static async LoadJsonBasic() {
    //     const file = '序章'
    //     const folder = 'Assets/JsonData/'
    //     const url = folder + file + '.json'
    //     const langs = await this.LoadJson(url)
    //     this.msg.innerText = JSON.stringify(langs)

    // } catch(e) {
    //     console.warn('language error', e)
    // }
}
