import "@/styles/globals.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);


export default function App({ Component, pageProps }) {
    return (
        <>
            {/*<Header>  */}
                <Component {...pageProps} />
            {/*</Header>  */}
        </>
    );
}