/** @type {import('steamworks.js')} */
const steamworks = require('steamworks.js');

export default class {

    static CreateSteamBasic() {
        const client = steamworks.init(480);  // 3.10 后版本不能再用 480
        const playerName = client.localplayer.getName()
        const playerLevel = client.localplayer.getLevel()
        const IP = client.localplayer.getIpCountry()
        
        // client.input.init()
        const items = client.workshop.getSubscribedItems()
        console.log(`${items.length} subscribed items: ${items.join(', ')}`)


        // <button id="activateOverlay">activate overlay</button>
        const div = document.createElement('div')
        div.id = 'activateOverlay'
        div.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
        `
        document.body.appendChild( div )
        
        div.innerHTML = `
        用户名 ${playerName} 
        <br> 玩家等级 ${playerLevel} 
        <br> 国家 ${IP}`

        div.addEventListener('click', function () {
            client.overlay.activateToWebPage('https://www.pzzzr.com/')
        })

        
       
    }
}