import { ReactElement } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
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
                                <h3>{notification.title}</h3>
                            </div>
                            <div className={classes.content}>
                                <p>{notification.message}</p>
                            </div>
                            <div className={classes.actions}>
                                {buttonText ? (
                                    <Button buttonText={buttonText} />
                                ) : (
                                    <>
                                        <Button
                                            onClick={onAffirm}
                                            buttonText='Yes'
                                        />
                                        <Button
                                            onClick={onReject}
                                            buttonText='No'
                                        />
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
