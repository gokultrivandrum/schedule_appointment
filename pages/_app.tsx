import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useStore } from '../store';
import { ToastContainer } from 'react-toastify';
import '../styles/index.css';
import '../styles/main.css';
import "rc-time-picker/assets/index.css";
import "rc-color-picker/assets/index.css";
import 'react-toastify/dist/ReactToastify.min.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)

  return <Provider store={store}>
    <Component {...pageProps} />
    <ToastContainer />
  </Provider>
}
