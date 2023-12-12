import { useMemo, ReactElement } from "react";
import classes from "./Button.module.css";

type Props = {
    buttonText: string;
    styles?: string;
    onClick?: (event?: any) => void;
};

const Button = ({ buttonText, onClick, styles }: Props): ReactElement => {
    const computedStyles = useMemo(
        () =>
            styles ? `${styles} ${classes.buttonStyles}` : classes.buttonStyles,
        [styles],
    );
    return (
        <button onClick={onClick} className={computedStyles}>
            {buttonText}
        </button>
    );
};

export default Button;
