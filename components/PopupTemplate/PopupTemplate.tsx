import { ReactElement } from "react";
import Card from "../ui/Card";
import { useSelector } from "react-redux";
import classes from "./PopupTemplate.module.css";

//type imports
import type { State } from "@/types";

type Props = {
    buttonText?: string;
    showModal?: boolean;
    onAffirm: () => void;
    onReject: () => void;
};

const PopupTemplate = ({
    buttonText,
    onAffirm,
    onReject,
}: Props): ReactElement => {
    const { notification } = useSelector((state: State) => state.ui);
    return (
        <>
            {notification.show ? (
                <>
                    <div className={classes.backdrop} />
                    <Card>
                        <main className={classes.modal}>
                            <div className={classes.heading}>
                                <h3>{notification.title ?? "Title"}</h3>
                            </div>
                            <div className={classes.content}>
                                <p>{notification.message ?? "Message"}</p>
                            </div>
                            <div className={classes.footer}>
                                {buttonText ? (
                                    <button>{buttonText}</button>
                                ) : (
                                    <>
                                        <button onClick={onAffirm}>Yes</button>
                                        <button onClick={onReject}>No</button>
                                    </>
                                )}
                            </div>
                        </main>
                    </Card>
                </>
            ) : null}
        </>
    );
};

export default PopupTemplate;
