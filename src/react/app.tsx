import { createRoot } from "react-dom/client";
import CopyIcon from "@rsuite/icons/Copy";
import CloseIcon from '@rsuite/icons/Close';
import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import {useEffect, useRef, useState} from "react";

const root = createRoot(document.body);
root.render(<RootComponent />);

function TitleBar() {
    const [isLoaded, setIsLoaded] = useState(false);
    const titleBarHeight = useRef<number>(null)

    useEffect(() => {
        (async () => {
            titleBarHeight.current = await window.electronApi.constants.getTitleBarHeight()
            console.log(`Got height: ${titleBarHeight.current}`)
            setIsLoaded(true);
        })();
    }, []);

    if (isLoaded) {
        return (
            <div className={"titlebar"} style={{height: `${titleBarHeight.current}px`}}>
                <div></div>
                <div style={{justifyContent: "right"}}>
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
