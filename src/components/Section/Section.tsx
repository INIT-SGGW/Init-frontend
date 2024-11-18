import { useEffect, useRef, PropsWithChildren } from 'react'
import './Section.css'

interface Props {
    bgColor?: "primary" | "secondary" | "none",
    flexDirection?: "row" | "column",
    alignItems?: "center" | "flex-start" | "flex-end",
    justifyContent?: "center" | "flex-start" | "flex-end"
    className?: string
    overflow?: "hidden" | "visible"
    relative?: boolean
    paddingTop?: string
}

function Section({ children, bgColor = "none", overflow = "visible", relative = false, paddingTop = "", flexDirection = "column", alignItems = "center", justifyContent = "center", className }: PropsWithChildren<Props>) {
    const outerSectionRef = useRef<HTMLDivElement>(null);
    const innerSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (outerSectionRef.current) {
            const backgroundColor = bgColor === "primary" ? "var(--primary-color)" : bgColor === "secondary" ? "var(--secondary-color)" : "transparent";
            outerSectionRef.current.style.backgroundColor = backgroundColor;
            outerSectionRef.current.style.overflow = overflow;
            outerSectionRef.current.style.position = relative ? "relative" : "unset";
        }

        if (innerSectionRef.current) {
            innerSectionRef.current.style.display = "flex";
            innerSectionRef.current.style.flexDirection = flexDirection;
            innerSectionRef.current.style.alignItems = alignItems;
            innerSectionRef.current.style.justifyContent = justifyContent;
            innerSectionRef.current.style.paddingTop = paddingTop;
        }
    }, [bgColor, flexDirection, alignItems, justifyContent, overflow, relative, paddingTop, innerSectionRef.current, outerSectionRef.current])

    return (
        <div ref={outerSectionRef} className='section'>
            <div ref={innerSectionRef} className={`${className} pagewidth`}>
                {children}
            </div>
        </div>
    )
}

export default Section