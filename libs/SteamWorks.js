const steamworks = require('steamworks.js')

/** 设置窗口 */
exports.SetSteam = function (mainWindow) {
  return
  // will be true when opened from steam big picture
  if (process.env.SteamTenfoot) {
    mainWindow.setFullScreen(true)
  } else {
    mainWindow.maximize()
  }
}

/**
 * 启动steam 客户端
 */
exports.Start = function () {
  
  // You can pass an appId, or don't pass anything and use a steam_appid.txt file
  const client = steamworks.init(480)
  
  // Print Steam username
  console.log('客户端用户名', client.localplayer.getName())
  
  // Tries to activate an achievement
  // if (client.achievement.activate('ACHIEVEMENT')) {
    // console.log('打开文档？')
    // }
    
    // client.overlay.activateToWebPage('https://www.example.com/');  // steam客户端首页跳转网页
    
    steamworks.electronEnableSteamOverlay()
}