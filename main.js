// electron 模块可以用来控制应用的生命周期和创建原生浏览窗口
const { app, BrowserWindow, Tray, nativeImage } = require('electron')
const path = require('path')
if (require('electron-squirrel-startup')) app.quit();
// const steamworks = require('steamworks.js')
const steam = require('./libs/SteamWorks.js')

const createWindow = () => {
    // 创建浏览窗口
    const mainWindow = new BrowserWindow({
        width: 960,
        height: 600,
        title: "AVG",
        icon: "assets/logo/app_icon.ico",
        webPreferences: {
            // webSecurity: false,
            // allowRunningInsecureContent: true,
            preload: path.join(__dirname, 'preload.js'),
            icon: path.join(__dirname, 'client/Assets/Textures/UI/Icon.png'),
            accessibleTitle: 'AVG',

            
            contextIsolation: false,
            nodeIntegration: true,  // 读取外部文件配置
            nodeIntegrationInWorker: true,  // 多线程
            enableRemoteModule: true
        }
    })

    steam.SetSteam(mainWindow)
    // 加载 index.html
    mainWindow.loadFile('./client/index.html')
    // mainWindow.loadURL('https://c3.pzzzr.com/va_arriba/')

    // 打开开发工具
    mainWindow.webContents.openDevTools({ mode: 'detach' })
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    // 任务栏图标
    // const url = path.join(__dirname, 'client/Assets/Textures/UI/Icon.png')
    // const icon = nativeImage.createFromPath(url)
    // new Tray(icon)

})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。
steam.Start()   // 启动steam
// steamworks.electronEnableSteamOverlay()
