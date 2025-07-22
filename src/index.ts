import { app, BrowserWindow, ipcMain, screen } from "electron";
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
    app.quit();
}

const createWindow = async () => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const rootHeight = primaryDisplay.workAreaSize.height;
    const rootWidth = primaryDisplay.workAreaSize.width;

    const mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        show: false,
        frame: false,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            devTools: false
        }
    });

    mainWindow.setMenu(null);

    await mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    mainWindow.show();
    // mainWindow.webContents.openDevTools();

    ipcMain.on("window.close", () => mainWindow.close());
    ipcMain.on("window.minimize", () => (mainWindow.isMinimized() ? mainWindow.restore() : mainWindow.minimize()));
    ipcMain.on("window.maximize", () => (mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize()));
    ipcMain.handle("constants.getTitleBarHeight", () => (rootHeight * 0.03));
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        await createWindow();
    }
});
