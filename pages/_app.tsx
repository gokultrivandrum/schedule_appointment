import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useStore } from '../store';
import '../styles/index.css';
import '../styles/main.css';
import "rc-time-picker/assets/index.css";
import "rc-color-picker/assets/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)

  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}
