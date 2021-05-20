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
axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);
  return (
    <SWRConfig
      value={{
        fetcher: (url) => axios.get(url).then((res) => res.data),
        dedupingInterval: 10000,
      }}
    >
      <AuthProvider>
        {!authRoute && <NavBar />}
        <Component {...pageProps} />
      </AuthProvider>
    </SWRConfig>
  );
}

export default MyApp;
