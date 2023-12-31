import classes from "./PageContent.module.css";

type Props = {
    title: string;
    children: React.ReactNode;
};

const PageContent = ({ title, children }: Props): React.ReactElement => {
    return (
        <div className={classes.content}>
            <h1>{title}</h1>
            {children}
        </div>
    );
};

export default PageContent;
