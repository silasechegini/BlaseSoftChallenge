import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

type Props = {
    children: React.ReactNode;
};
const Layout = (props: Props): React.ReactElement => {
    return (
        <div>
            <MainNavigation />
            <div className={classes.background}></div>
            <main className={classes.main}>{props.children}</main>
        </div>
    );
};

export default Layout;
