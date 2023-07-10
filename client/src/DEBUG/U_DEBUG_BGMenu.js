
export default class {
        /**
     * @param {HTMLDivElement} msg 
     */
    static MakeErrMsg(msg){
       msg.className = 'errMsg' 
       document.body.appendChild( msg )
    }
    
    /**
     * 
     * @param {HTMLDivElement} bgMenu 
     * @param {HTMLDivElement} closeBtn 
     */
    static MakeBG(bgMenu, closeBtn){
        bgMenu.id = 'debug'
        closeBtn.className = 'close'
        closeBtn.innerText = 'X'
        let isClose = true
        closeBtn.onclick = () => {
            const d = isClose ? '-180px' : '0'
            bgMenu.style.transform = `translateX(${ d })`
            isClose = !isClose
        }
        
        document.body.appendChild( bgMenu )
        bgMenu.appendChild( closeBtn )  // 关闭按钮
    }    
}