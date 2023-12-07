import Layout from "../components/layout/Layout";
import { Provider } from "react-redux";
import store from "../store";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default MyApp;
