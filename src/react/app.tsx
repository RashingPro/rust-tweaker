import { createRoot } from "react-dom/client";
import { useEffect, useRef, useState } from "react";
import "./app.css";
import { IconCopy, IconMinus, IconSquareX } from "@tabler/icons-react";

const root = createRoot(document.body);
root.render(<RootComponent />);

function TitleBar(props: { windowTitle: string; height: number }) {
    return (
        <div className={"titlebar"} style={{ height: `${props.height}px`, minHeight: `${props.height}px` }}>
            <div style={{ justifyContent: "left" }} className={"app-drag"}>
                <span>{props.windowTitle}</span>
            </div>
            <div style={{ justifyContent: "right" }} className={"app-no-drag"}>
                <button className={"titlebar__minimize"} onClick={window.electronApi.window.toggleMinimize}>
                    {/*<CollaspedOutlineIcon />*/}
                    <IconMinus />
                </button>
                <button className={"titlebar__maximize"} onClick={window.electronApi.window.toggleMaximize}>
                    {/*<CopyIcon />*/}
                    <IconCopy transform={"scale(-1, 1)"} />
                </button>
                <button className={"titlebar__close"} onClick={window.electronApi.window.closeWindow}>
                    {/*<CloseIcon />*/}
                    <IconSquareX />
                </button>
            </div>
        </div>
    );
function RootComponent() {
    const [isLoaded, setIsLoaded] = useState(false);
    const titleBarHeight = useRef<number>(null);
    const windowTitle = useRef<string>(null);

    useEffect(() => {
        (async () => {
            titleBarHeight.current = await window.electronApi.constants.getTitleBarHeight();
            windowTitle.current = await window.electronApi.constants.getWindowTitle();
            setIsLoaded(true);
        })();
    }, []);

    if (isLoaded) {
        window.electronApi.events.rootLoaded();
        return (
            <div className={"root"}>
                <TitleBar windowTitle={windowTitle.current} height={titleBarHeight.current} />
                <div className={"page-content"}></div>
            </div>
        );
    }
}
