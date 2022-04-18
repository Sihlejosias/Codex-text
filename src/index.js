const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs')


if (require('electron-squirrel-startup')) {
  
  app.quit();
}

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      preload: path.join(app.getAppPath(), "./src/render.js")
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};


app.on('ready', createWindow);

ipcMain.on("create-document-triggered", () => {
  dialog.showSaveDialog(mainWindow, {
    filters: [{name: "text files", extenstions: "txt"}]
  }).then(({ filePath }) => {
    fs.writeFile(filePath,  " ", (errer) => {
      if (errer) {
        alert("Could not save file, please contact the developer to report bug or open an issue on github repository");
      } else {
        mainWindow.webContents.send("document-created", filePath);
      };
    });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
