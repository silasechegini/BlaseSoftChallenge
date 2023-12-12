import classes from "./Modal.module.css";
import { createPortal } from "react-dom";
import React, {
    Fragment,
    ReactNode,
    useEffect,
    useRef,
    ReactElement,
} from "react";

type BackdropProps = {
    onClick?: () => void;
};

type OverlayProps = {
    children: ReactNode;
};

type ModalProps = {
    show?: boolean;
    selector?: string;
    onClick?: () => void;
    children: ReactNode;
};

const Backdrop = ({ onClick }: BackdropProps): ReactElement => {
    return <div className={classes.backdrop} onClick={onClick} />;
};
const ModalOverlay = ({ children }: OverlayProps): ReactElement => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{children}</div>
        </div>
    );
};

const Modal = ({
    children,
    onClick,
    show,
    selector,
}: ModalProps): ReactElement => {
    const portalElement = useRef<Element | null>(null);

    useEffect((): (() => void) => {
        portalElement.current = document.querySelector("#portaloverlay");

        return () => (portalElement.current = null);
    }, [selector, show]);

    return (
        <Fragment>
            {portalElement.current && show
                ? createPortal(
                      <>
                          <Backdrop onClick={onClick} />
                          <ModalOverlay>{children}</ModalOverlay>
                      </>,
                      portalElement.current,
                  )
                : null}
        </Fragment>
    );
};

export default Modal;
