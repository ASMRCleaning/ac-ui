import "../styles/bootstrap.min.css";
import Layout from "../components/Layout";
import RouteGuard from "../components/RouteGuard";
import { Provider } from "jotai";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider>
        <RouteGuard>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RouteGuard>
      </Provider>
    </>
  );
}

export default MyApp;
