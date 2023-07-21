import U_Entity from "../frame/U_Entity.js";
import { U_System } from "../frame/U_System.js";
import C_Stage from "./C_Stage.js";

export default class extends U_System {
    /**
     * 
     * @param {U_Entity} e 
     */
    constructor(e) {
        super('basic system')
        this.stage = e.GetComponent(C_Stage)

        this._Init()
    }

    _Init() {
        const { bg, bg1, bg2, dialogue, rollerName, nextIndicator, 
            mask, textTitle,
            character1, character2, character3, chooseMenu, choose1, choose2, choose3 } = this.stage
        const arr = [bg, bg1, bg2, mask]
        for (let i of arr) {
            i.classList = ['fullscreen']
        }
        document.body.appendChild(bg)

        const ar2 = [bg1, bg2, mask, dialogue, rollerName, nextIndicator, textTitle,
            character1, character3, character2, chooseMenu]
        for (let i of ar2) {
            bg.appendChild(i)
        }

        const ar3 = [choose1, choose2, choose3]
        for( let i of ar3 ) chooseMenu.appendChild( i )

        textTitle.className = 'textTitle'
        mask.classList.add('mask')
        chooseMenu.className = 'chooseMenu'
        dialogue.className = 'dialogue'
        rollerName.className = 'rollerName'
        nextIndicator.className = 'nextIndicator'
        character1.className = 'C_left'
        character2.className = 'C_mid'
        character3.className = 'C_right'
        // dialogue.innerText = '沙发沙发沙发阿斯顿发 沙发沙发沙发阿斯顿发沙发沙发沙发阿斯顿发沙发沙发 沙发阿 斯顿发沙发沙发 沙发阿斯顿发沙发沙发沙发阿斯顿发沙发沙发沙发阿斯顿发\n sadfasdf sad发生的饭撒地方'
    }
}