/** @enum {symbol | number} */
export default Object.freeze({
    // INPUT_MOVE: 1,
    // INPUT_MOVEVIEW: 2,
    INPUT_KEY_EXTRA: 3,   // 其次按钮
    INPUT_KEY_EXTRA_END: 4,   // 其次按钮

    // INPUT_FIRE: 5,
    // INPUT_FIRE_END: 51,
    // INPUT_ZOOM: 6,
    // INPUT_JUMP: 7,

    // 设置部分内容
    UI_MENU_OPEN: Symbol(1),   // 菜单开启 
    UI_MENU_CLOSE: Symbol(1),   // 菜单关闭
    // 给声音控制
    UI_CHANGE_BGSOUND_VOLUME: Symbol(25),
    UI_CHANGE_BGSOUND_ISPLAY: Symbol(26),
    UI_BTN_CLICK: Symbol(31),  // UI 统一按钮点击
    UI_Number_Count: Symbol(32),   // UI 数字倒数
    UI_SHOW_IOS_RANK: Symbol(32),

    UI_MSG: Symbol(1),
    LOAD_JSON_SCRIPT: Symbol(1),  // 读取脚本

    // CHANGE_BG: Symbol(1),   // 改变背景
})