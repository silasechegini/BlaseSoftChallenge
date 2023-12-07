import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

type Props = {
    children: React.ReactNode;
};
function Layout(props: Props) {
    return (
        <div>
            <MainNavigation />
            <div className={classes.background}></div>
            <main className={classes.main}>{props.children}</main>
        </div>
    );
}

export default Layout;
