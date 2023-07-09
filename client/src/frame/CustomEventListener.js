// @ts-check

// export const CustomEvents = Object.freeze({  // 这里不使用，全部放到Databus中设置一个新文件
//     START_WALK: 1,
// })

// let _habdleO = {}
let _hMap = new Map()  // 2021.1.24 替换成Map
let i, list, event

// 自定义时间监听
export class CustomEventListener {


    // safari 不支持
    // static _habdleO = []   // 用一个二维数组，存 事件: [ 触发的监听1， 监听2 ... ]

    /**
     * 查看当前所有事件
     */
    static get evs() {
        // return _habdleO
        return _hMap
    }

    /**
     * 
     //  监听  输入时间名字，回调函数，目标（一般是this）
     * @param { symbol | number | string } eventName 
     * @param { function } callbackFunc 
     * @param { any } target 
     */
    static On(eventName, callbackFunc, target) {
        // if(!eventName) return console.error('no event', eventName, CustomEvents)  // 判断有无该时间

        // if( !_habdleO[ eventName] ) _habdleO[ eventName ] = []
        if (!_hMap.has(eventName)) _hMap.set(eventName, []) // 判断是否已经存在数据
        // console.warn('有监听g', eventName, _habdleO)

        // _habdleO[eventName].push({
        _hMap.get(eventName).push({
            func: callbackFunc,
            target
        })
    }

    // todo: 加入 has 判断是否存在该事件

    /**
     * 
     // 删除监听
     * @param { number | symbol } eventName 
     * @param { Function } callbackFunc 
     * @param {*} target 
     */
    static Off(eventName, callbackFunc, target) {
        // list = _habdleO[ eventName ]
        list = _hMap.get(eventName)
        if (!list || list.length <= 0) return console.error('no event')

        for (i = 0; i < list.length; i++) {
            event = list[i]
            if (event.func === callbackFunc && (!target || target === event.target)) {
                list.splice(i, 1)
                // console.log('删除事件', eventName, callbackFunc, target)
                break
            }
        }
    }


    /**
     // 调度（激活） 事件，类似emit, 输入事件名，和参数
     * 
     * @param {number | symbol} eventName 
     * @param { Object } args 
     */
    static Dispatch(eventName, ...args) {  // 2021.7.12 改成可以传递多个参数
        if (!eventName) debugger   // 如果传入事件为空就暂停
        // list = _habdleO[eventName];
        list = _hMap.get(eventName)
        if (!list || list.length <= 0) {
            return;
        }
        // console.log('调度激发事件', eventName, args, list)

        // for ( i = 0; i < list.length; i++) {
        // event = list[i];
        for (event of list) {
            // event.func.apply(event.target, args);  // apply只能接收数组作为参数
            event.func.call(event.target, ...args);
        }
    }



    //  * @extends {Class}
    /**
     // 尝试只运行一次的事件
     * @template { function } T
     *
     
     * @param { number } eventName 
     * @param { Function } func 
     * @param { T } cl 
     */
    static Once(eventName, func, cl) {
        const ff = (...d) => {
            // console.warn('运行一次。。。。。。。。。。。。。。。。。。。。。。。', d)
            func.call(cl, ...d)
            this.Off(eventName, ff, cl)
        }
        this.On(eventName, ff, cl)
        // this.dispatch( eventName, args )  // 不能直接激活
    }

}