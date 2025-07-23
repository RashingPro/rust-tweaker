import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronApi", {
    window: {
        closeWindow: () => ipcRenderer.send("window.close"),
        toggleMinimize: () => ipcRenderer.send("window.minimize"),
        toggleMaximize: () => ipcRenderer.send("window.maximize")
    },
    constants: {
        getTitleBarHeight: () => ipcRenderer.invoke("constants.getTitleBarHeight"),
        getWindowTitle: () => ipcRenderer.invoke("constants.getWindowTitle")
    },
    events: {
        rootLoaded: () => ipcRenderer.send("events.rootLoaded")
    }
});
