// @ts-check
/**
 * @template {class} T 
  * @property {constructor} constructor
 */
// * @extends {class}
//  * @typedef {ClassDecorator} T 
export default class {
    /**
     * 
     * @param {String?} name 
     */
    constructor(name) {
        this.name = name;
        this.components = []
    
        // 为了兼容
        this.addComponent = this.AddComponent.bind(this)
        this.removeComponent = this.RemoveComponent.bind(this)
        this.getComponent = this.GetComponent.bind(this)
        this.hasComponent = this.HasComponent.bind(this)
    }




    // /**
    //  * @description 加入component 到当前class 
    //  * @param {T} ComponentType 
    //  * @param  {...any} args 
    //  * @returns {T}
    //  */
    AddComponent(ComponentType, ...args) {

        //2021.7.2 加入判断避免重复添加同一类型component
        const ndx = this.components.findIndex(c => c instanceof ComponentType);
        // debugger
        if (ndx >= 0) {
            console.warn('存在相同component', ComponentType, this.components[ndx])
            debugger
            // return this.components[ndx];
        }


        const component = new ComponentType(...args);

        // 2020.2.20 检查加入内容为空的情况
        // const len = core.Olength( component )
        // if( len <= 0 ) debugger
        // console.log('加入的内容', component)

        this.components.push(component);
        // this.fixArr.push(component.fixUpdate.bind(component))
        // this.arr.push(component.update.bind(component))
        // if(component.start) component.start().then()
        return component;
    }

    // /**
    //  * @description 删除 component
    //  * @param {T} component 
    //  */
    RemoveComponent(component) {
        // removeArrayElement(this.components, component);
        // const ndx = this.components.indexOf(component);
        const ndx = this.components.findIndex(c => c instanceof component);
        // debugger
        if (ndx < 0) {
            // console.error('component not found', component)
            return
        }
        // this.arr.splice(ndx, 1);
        // this.fixArr.splice(ndx, 1);
        // 2021.7.3 加入删除component 时运行 component 的 deinit，便于清空内存
        if (this.components[ndx].deinit) this.components[ndx].deinit()
        if (this.components[ndx].Deinit) this.components[ndx].Deinit()

        this.components.splice(ndx, 1);

    }

    // /**
    //  * @description 传入类型获取当前class中对应组件
    //  * @param {T} ComponentType 
    //  * @returns { new() => T }
    //  */
    GetComponent(ComponentType) {
        const v = this.components.find(c => c instanceof ComponentType);
        if( !v ){
            console.error('no component found', this.components, JSON.stringify(ComponentType))
            debugger
        }
        return v
    }




    // /**
    //  * @description 判断是否存在该组件
    //  * @param {T} component 
    //  * @returns boolean
    //  */
    HasComponent(component) {
        const ndx = this.components.findIndex(c => c instanceof component);
        return ndx >= 0
    }
}