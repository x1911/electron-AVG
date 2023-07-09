import { U_System } from "../../lib/U_System.js";
import E_Scene from "./E_Scene.js";

export default class extends U_System{
    
    /**
     * 
     * @param {E_Scene} e 
     */
    constructor(e){
        super('FixUpdate System')
        this.e = e
        this.d = e.data
        this.u = e.updateData
        
        this.Update = this.Update.bind( this ) 
        this.update = this.Update
        // console.time('aa')
        this._FixAnimate()
        // this.time = this.d.time
    }
    
    
    Update() {  // 之前这里的速度在慢的机器上不一致  后换用fixDelta 测试同u狗
        // return
        if( this.d.isPause ) return   // 暂停就返回
        this.u.uRate = this.d.time - this.u.fixUpdateTime  // 当前时间 - 上一次循环时间
        if (this.u.uRate < this.u.slowRate / Math.min(this.d.slowVal * 2, 1)) return   // 尝试减速 这里是固定值
        this.u.fixUpdateTime = this.d.time

        // console.log('fasdf', this.u.uRate)

        for (this.u.i of this.u.slowUpdateFuncs.values()) {
            this.u.i()
        }
    }
    
    _FixAnimate() {
        
        const interv = () => {
            // console.timeLog('aa')
            // const diff = this.d.time - this.time
            // this.time = this.d.time
            // console.log('fix间隔', diff)

            if( !this.d.isPause ){   // 没有暂停的情况
                for (this.u.i of this.u.fixUpdateFuncs) {
                    this.u.i()
                }
            }

            
            setTimeout(interv, this.u.fixRate)
        }
        setTimeout(interv, this.u.fixRate)
    }
    
    
    


}