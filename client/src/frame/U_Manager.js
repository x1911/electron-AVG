// @ts-check
import { U_System } from "./U_System.js"

// @ts-check
/**
 * @template {function} T 
  * @property {function=} constructor
  * @property {function=} deinit
 */
export class U_Manager {
    /**
     * @param {string} n 系统名字 
     */
    constructor(n) {
        this.name = n
        /** @type {Array<U_System>} */
        this.system_arr = []

        this._s = null

        this.Update = this.Update.bind(this)
        this.FixUpdate = this.FixUpdate.bind(this)
        this.SlowUpdate = this.SlowUpdate.bind(this)

        /** 为了兼容 */
        this.update = this.update.bind(this)
        this.fixUpdate = this.fixUpdate.bind(this)
        this.slowUpdate = this.slowUpdate.bind(this)

        this.addSystem = this.AddSystem.bind(this)
        this.removeSystem = this.RemoveSystem.bind(this)
    }

    /**
 * @param {U_System} one 
 * @param {number} dt 
 * @param {number} fdt 
 */
    Update(one, dt, fdt) {
        for (this._s of this.system_arr) {
            this._s.Update(one, dt, fdt)
            // this._s.Update && this._s.Update(one, dt, fdt)
            // this._s.update && this._s.update(one, dt, fdt)
        }
    }

    /**
* @param {T} one 
*/
    FixUpdate(one) {
        for (this._s of this.system_arr) {
            this._s.FixUpdate(one)
        }
    }

    /**
 * @param {T} one 
 */
    SlowUpdate(one) {
        for (this._s of this.system_arr) {
            this._s.SlowUpdate(one)
        }
    }


    /**
     * @param {U_System} one 
     * @param {number} dt 
     * @param {number} fdt 
     */
    update(one, dt, fdt) {
        for (this._s of this.system_arr) {
            this._s.update(one, dt, fdt)
        }
    }

    /**
     * @param {T} one 
     */
    fixUpdate(one) {
        for (this._s of this.system_arr) {
            this._s.fixUpdate(one)
        }
    }

    /**
     * @param {T} one 
     */
    slowUpdate(one) {
        for (this._s of this.system_arr) {
            this._s.slowUpdate(one)
        }
    }

    /**
     * 加入一个系统并返回
     * @param {T} S 
     * @param  {...any} arg 
     * @returns {T}
     */
    AddSystem(S, ...arg) {
        //2021.7.2 加入判断避免重复添加同一类型component
        const ndx = this.system_arr.findIndex(c => c instanceof S);
        if (ndx >= 0) {
            console.warn('存在相同系统', S, arg)
            debugger
            return this.system_arr[ndx]
        }

        const s = new S(...arg)
        // this.systemArr.push(move)
        this.system_arr.push(s)
        return s
    }

    /**
     * 删除一个系统
     * 
     * @param {T} S 
     */
    RemoveSystem(S) {
        for (let i = this.system_arr.length - 1; i >= 0; i--) {
            const v = this.system_arr[i]
            if (!(v instanceof S)) continue
            this.system_arr.splice(i, 1)
            if (v.Deinit) v.Deinit()
        }
    }

    /**
     * 
     * @param {T} ComponentType 
     * @returns {T}
     */
    GetSystem(ComponentType) {
        return this.system_arr.find(c => c instanceof ComponentType);
    }

    /**
     * @func 循环多个 holder，提取其中的component
     */
    // loop(cb) {
    //     for (j of this.queriesArr) {
    //         for (i in j) {
    //             cb(j[i])
    //         }
    //     }
    // }
}