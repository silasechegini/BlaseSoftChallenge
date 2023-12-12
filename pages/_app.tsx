import Layout from "../components/layout/Layout";
import { Provider } from "react-redux";
import store from "../store";
import "../styles/globals.css";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps): React.ReactNode => {
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
};

export default MyApp;
