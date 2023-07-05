import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/index';
import '../styles/globals.css';
import customTheme from '../styles/theme';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  // Change default dark mode bg color
  styles: {
    global: (props: any) => ({
      body: {
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('gray.100', '#141214')(props),
      },
    }),
  },
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Provider store={store}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Component {...pageProps} />
        </SessionProvider>
      </Provider>
    </ChakraProvider>
  );
};

export default MyApp;
