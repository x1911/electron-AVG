
class BasicClass<T> {
     constructor() {}
}

export default class {

     // name: String;
     // components: Array<T>
     
     /** 传入泛型类，返回实例 */
     GetComponent<T>(ComponentType: (new (...arg: any) => T)): T ;
     AddComponent<T>(ComponentType: (new (...arg: any) => T), ...arg: any): T;
     RemoveComponent<T>(ComponentType: T): void ;
     HasComponent<T>(ComponentType: T): Boolean ;
}

