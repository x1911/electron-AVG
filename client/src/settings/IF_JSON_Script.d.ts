import Enum_BGChangeTypes from './Enum_BGChangeTypes.js'

export default class {

        '指令': '清空' | '文字' | '立绘' | '背景' | '选项' | '声音' | '音乐' | '切换背景' | '背景特效' | '移动背景'

        '角色': string

        '位置': '左' | '中' | '右'

        '资源': string // 播放音效, 音乐，循环

        // 缩放 *背景的缩放，默认大小是1*
        // X *以屏幕中心为0的X轴位置*
        // Y *以屏幕中心为0的Y轴位置*
        // 时间 *背景移动到目标位置的时间*
        // 等待 *留空，用于判断是否等待该指令结束*
        "等待": ?string
        
        '内容': string | Array<{ '选项': string, '脚本': string }>

        // 给切换背景用的类型 Enum_BGChangeTypes
        "类型": string
        
        // 给背景特效使用，定制不同的数值
        "数值": [number]
        "数值2": [number]
}