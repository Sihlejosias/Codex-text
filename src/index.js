const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
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

  const menuTemplate = [{
    label: "File",
    submenu: [{
      label: "Open",
      click: () => ipcMain.emit("open-document-triggered"),
    },
    {
      label: "New",
      click: () => ipcMain.emit("create-document-triggered"),
    },
    {
      label: "Save",
      click: () => ipcMain.emit(""),
    },
    {
      label: "Save as",
      click: () => ipcMain.emit(""),
    },
    {
      type: "separator"
    },
    {
      role: "quit",
    },
    ],
  }, 
  {
    label: "Edit",
    submenu: [{
      role: "undo"
    },
    {
      role: "redo"
    },
    {
      role: "cut"
    },
    {
      role: "copy"
    },
    {
      role: "paste"
    },
    ],
  },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
};


app.on('ready', createWindow);

ipcMain.on("create-document-triggered", () => {
  dialog.showSaveDialog(mainWindow, {
    filters: [{name: "text files", extenstions: "txt"}]
  }).then(({ filePath }) => {
    fs.writeFile(filePath,  " ", (error) => {
      if (error) {
        alert("Sorry, Couldn't create a document. Please contact the developer.");
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
        alert("Sorry, Couldn't open a document. Please contact the developer.");
      } else {
        mainWindow.webContents.send("document-opened", { filePath, content });
      }
    });
  });
});

ipcMain.on("file-content-updated", (_, textareaContent) => {
  fs.writeFile(openedFilePath, textareaContent, (error) => {
    if (error) {
      alert("Sorry, Couldn't save a document. Please contact the developer.");
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
