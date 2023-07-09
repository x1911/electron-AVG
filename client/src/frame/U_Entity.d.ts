
class BasicClass<T> {
     constructor() {}
}

export default class {

     // name: String;
     // components: Array<T>
     
     /** 传入泛型类，返回实例 */
     GetComponent<T>(ComponentType: (new () => T)): T ;
     AddComponent<T>(ComponentType: (new () => T), ...arg: Any): T;
     RemoveComponent<T>(ComponentType: T): void ;
     HasComponent<T>(ComponentType: T): Boolean ;
}

