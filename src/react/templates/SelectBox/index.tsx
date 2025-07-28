import React, { FocusEvent, ReactHTMLElement, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./index.css";

export interface SelectBoxProps {
    direction?: "up" | "down";
    dropBoxPadding?: number;
    defaultSelected?: number | string;
    options: React.ReactNode[];
    className?: string;
}

export default function SelectBox({
    direction = "down",
    dropBoxPadding = 5,
    options,
    defaultSelected = 0,
    className
}: SelectBoxProps) {
    if (options.length == 0) throw new Error("Options array is empty");

    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(
        typeof defaultSelected === "number" ? defaultSelected : undefined
    );
    const [width, setWidth] = useState<number>();
    const [dropTop, setDropTop] = useState<number>();
    const [dropLeft, setDropLeft] = useState<number>();

    const parentRef = useRef<HTMLDivElement>(null);
    const dropRef = useRef<HTMLDivElement>(null);

    const selectedElement: React.ReactNode =
        selectedIndex == undefined ? <>{defaultSelected}</> : options[selectedIndex];

    useLayoutEffect(() => {
        if (parentRef.current && dropRef.current) {
            const currentSelected = parentRef.current.children.item(0) as HTMLDivElement;
            const options = Array.from(dropRef.current.children).map((val) => val as HTMLDivElement);
            setWidth(Math.max(currentSelected.offsetWidth, ...options.map((val) => val.offsetWidth)) + 1);
        }
    }, [options, defaultSelected]);

    useLayoutEffect(() => {
        if (parentRef.current && dropRef.current) {
            if (direction == "down")
                setDropTop(
                    window.scrollY +
                        parentRef.current.getBoundingClientRect().top +
                        parentRef.current.offsetHeight +
                        dropBoxPadding
                );
            else setDropTop(parentRef.current.offsetTop - dropBoxPadding - dropRef.current.offsetHeight);
            setDropLeft(parentRef.current.offsetLeft);
        }
    }, [width, parentRef.current?.getBoundingClientRect()]);

    return (
        <div className={"select-box-container" + (className ? ` ${className}` : "")}>
            <div
                tabIndex={0}
                className={"select-box"}
                ref={parentRef}
                onBlur={(event) => event.relatedTarget != dropRef.current && setIsOpen(false)}
                onClick={() => setIsOpen((val) => !val)}
                style={{ width: width }}
            >
                <div style={{ width: "fit-content" }}>{selectedElement}</div>
            </div>

            <div
                tabIndex={0}
                ref={dropRef}
                className={"select-box__drop"}
                style={{ top: dropTop, left: dropLeft, width: width, ...(isOpen ? {} : { visibility: "hidden" }) }}
                onBlur={(event) => event.relatedTarget != parentRef.current && setIsOpen(false)}
            >
                {options.map((element, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            setSelectedIndex(index);
                            setIsOpen(false);
                        }}
                    >
                        {element}
                    </div>
                ))}
            </div>
        </div>
    );
}
