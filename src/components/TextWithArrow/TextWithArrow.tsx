import { ElementType, ReactNode } from 'react'
import './TextWithArrow.css'
import ArrowYellowIcon from '../../assets/arrow-yellow.svg';
import ArrowBlackIcon from '../../assets/arrow-black.svg';

interface DynamicElementProps {
    element: ElementType,
    children: ReactNode
    className?: string,
    [key: string]: any
}

interface TextWithArrowProps {
    textElement: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    wrapperElement: "a" | "div" | "button",
    text: string,
    color: 'primary' | 'secondary',
    fontSize: string,
    fontWeight?: string,
    [key: string]: any
}
const DynamicElement: React.FC<DynamicElementProps> = ({ element: Element, children, className, ...props }) => {
    return <Element className={className} {...props}>{children}</Element>;
};

const TextWithArrow: React.FC<TextWithArrowProps> = ({ textElement, wrapperElement, color, text, fontSize, fontWeight, ...props }) => {
    return (
        <DynamicElement
            element={wrapperElement}
            className={`text-with-arrow${(wrapperElement === "a" || wrapperElement === "button") ? " clickable" : ""}`}
            style={{ fontSize: fontSize }}
            {...props}
        >
            <img
                src={color === "primary" ? ArrowYellowIcon : ArrowBlackIcon}
                className='text-with-arrow__icon'
                alt="arrow"
            />
            <DynamicElement
                element={textElement}
                className='text-with-arrow__text'
                style={{
                    color: color === "primary" ? "var(--primary-color" : "var(--secondary-color)",
                    fontSize: fontSize,
                    fontWeight: fontWeight
                }}
            >
                {text}
            </DynamicElement>
        </DynamicElement>
    )
}

export default TextWithArrow