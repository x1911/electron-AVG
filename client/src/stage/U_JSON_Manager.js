// @ts-check
import St_URL from "../settings/St_URL.js";
import C_Stage from "./C_Stage.js";

export default class {

    /**
     * 指令 立绘
    * @param {C_Stage} st 
     * @param {'左' | '中' | '右'} pos  位置 左 / 中 / 右
     * @param {String} url 
     */
    static ShowCharacter(st, pos, url) {
        const { character1, character2, character3 } = st
        let cc = character1
        if (pos === '中') cc = character2
        else if (pos === '右') cc = character3
        const uu = St_URL.CharacterFolder + url + '.png'
        console.log('图片', uu)
        // cc.style.backgroundImage = `url('${uu}')`
        cc.src = uu
        // cc.style.display = `block`
        // cc.style.opacity = '0'
        // setTimeout(() => {
        cc.style.opacity = '1'
        // }, 200)
        // debugger
    }


    /**
     * 背景
     * @param {C_Stage} st 
     */
    static ShowBg(st, bgFileName) {
        const uu = St_URL.BGFolder + bgFileName + '.jpg'
        st.bg1.style.opacity = '1'
        st.bg1.style.backgroundImage = `url('${uu}')`
    }

    /**
     * 清除
     * @param {C_Stage} st 
     */
    static RemoveAll(st) {
        const { bg1, bg2, dialogue, rollerName, nextIndicator,
            character1, character2, character3, chooseMenu } = st
        const arr = [bg1, bg2, dialogue, rollerName, nextIndicator, chooseMenu]
        for (let i of arr) {
            // i.style.display = 'none'
            i.style.opacity = '0'
        }
        const a2 = [character1, character2, character3]
        for (let i of a2) i.style.opacity = '0'
    }


    /**
 * 隐藏对白
 * @param {C_Stage} st 
 */
    static HideDialogue(st) {
        const { dialogue, rollerName, nextIndicator, } = st
        const arr = [dialogue, rollerName, nextIndicator,]
        for (let i of arr) {
            // i.style.display = 'none'
            i.style.opacity = '0'
        }
    }
}
