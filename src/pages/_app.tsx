import { AppProps } from "next/app";
import axios from "axios";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

// styles
import "../styles/globals.css";
import "../styles/icons.css";

// components
import NavBar from "../components/navbar";
import { AuthProvider } from "../context/auth";

// axios default config
axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
axios.defaults.withCredentials = true;

const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);
  return (
    <SWRConfig
      value={{
        fetcher,
        dedupingInterval: 10000,
      }}
    >
      <AuthProvider>
        {!authRoute && <NavBar />}
        <div className={!authRoute ? "" : "pt-12"}>
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </SWRConfig>
  );
}

export default MyApp;
