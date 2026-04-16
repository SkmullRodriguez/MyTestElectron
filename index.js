const { app, BrowserWindow } = require('electron/main')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      //preload: `${__dirname}/preload.js`
      // tamiién se puede usar el directorio para construir la ruta al archivo preload.js
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  win.setMenu(null) // Elimina el menú de la ventana
  
  win.loadFile('index.html') // Carga el archivo HTML en la ventana
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) 
      createWindow()
    })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') 
    app.quit()
  })
