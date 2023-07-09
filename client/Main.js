// import fs from 'fs'

import M_Game from "./src/M_Game.js"
import ZUtils from "./src/libs/ZUtils.js"

class Main {
    constructor() {



        new M_Game()


        // const aa = document.createElement('iframe')
        // aa.src = 'https://c3.dogfightx.com'
        // document.body.appendChild( aa )


        // this.Start2()
        // this.Start()
    }



    async Start2() {
        const d = document.createElement('div')
        d.innerText = 'asdfasf'
        document.body.appendChild(d)
        this.msg = d
        await ZUtils.LoadJsonBtn( langs => {
            this.msg.innerText = JSON.stringify(langs)
        })
    }


}

new Main()