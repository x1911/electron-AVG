
/** @type {any} */
export class U_System{
    constructor(name){
        this.name = name
        
        // 为了兼容
        // this.update = this.Update.bind(this)
        // this.fixUpdate = this.FixUpdate.bind(this)
        // this.slowUpdate = this.SlowUpdate.bind(this)
        // this.deinit = this.Deinit.bind(this)
    }
    
    Update(one, dt, fdt){ }
    FixUpdate(one){ }
    SlowUpdate(one) { }
    Deinit(){ }
    

}