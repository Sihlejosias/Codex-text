const { app, BrowserWindow, ipcMain, dialog, Notification } = require('electron');
const path = require('path');
const fs = require('fs')


if (require('electron-squirrel-startup')) {
  
  app.quit();
}

let mainWindow;
let openedFilePath;

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

const handleError = () => {
  new Notification({
    title: "Error"
    body: "Sorry, Something went wrong :("
  }).show();
};

ipcMain.on("create-document-triggered", () => {
  dialog.showSaveDialog(mainWindow, {
    filters: [{name: "text files", extenstions: "txt"}]
  }).then(({ filePath }) => {
    fs.writeFile(filePath,  " ", (error) => {
      if (error) {
        handleError();
      } else {
        openedFilePath = filePath;

        mainWindow.webContents.send("document-created", filePath);
      };
    });
  });
});

ipcMain.on("open-document-triggered", () => {
  dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{name: "text files", extenstions: "txt"}],
  }).then(({ filePaths }) => {
    const filePath = filePaths[0];
    openedFilePath = filePath;

    fs.readFile(filePath, "utf8", (error, content) => {
      if(error) {
        handleError();
      } else {
        mainWindow.webContents.send("document-opened", { filePath, content });
      }
    });
  });
});

ipcMain.on("file-content-updated", (_, textareaContent) => {
  fs.writeFile(openedFilePath, textareaContent, (error) => {
    if (error) {
      handleError();
    }
  })
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
