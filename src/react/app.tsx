import { createRoot } from "react-dom/client";
import CopyIcon from "@rsuite/icons/Copy";
import CloseIcon from "@rsuite/icons/Close";
import CollaspedOutlineIcon from "@rsuite/icons/CollaspedOutline";
import { useEffect, useRef, useState } from "react";
import "./app.css";

const root = createRoot(document.body);
root.render(<RootComponent />);

function TitleBar() {
    const [isLoaded, setIsLoaded] = useState(false);
    const titleBarHeight = useRef<number>(null);
    const windowTitle = useRef<string>(null);

    useEffect(() => {
        (async () => {
            titleBarHeight.current = await window.electronApi.constants.getTitleBarHeight();
            windowTitle.current = await window.electronApi.constants.getWindowTitle();
            console.log(`Got height: ${titleBarHeight.current}`);
            console.log(`Got window title: ${windowTitle.current}`);
            setIsLoaded(true);
        })();
    }, []);

    if (isLoaded) {
        window.electronApi.events.rootLoaded();

        return (
            <div className={"titlebar"} style={{ height: `${titleBarHeight.current}px` }}>
                <div style={{ justifyContent: "left" }} className={"app-drag"}>
                    {windowTitle.current}
                </div>
                <div style={{ justifyContent: "right" }} className={"app-no-drag"}>
                    <button className={"titlebar__minimize"} onClick={window.electronApi.window.toggleMinimize}>
                        <CollaspedOutlineIcon />
                    </button>
                    <button className={"titlebar__maximize"} onClick={window.electronApi.window.toggleMaximize}>
                        <CopyIcon />
                    </button>
                    <button className={"titlebar__close"} onClick={window.electronApi.window.closeWindow}>
                        <CloseIcon />
                    </button>
                </div>
            </div>
        );
    }
}

function RootComponent() {
    return (
        <>
            <TitleBar />
        </>
    );
}
