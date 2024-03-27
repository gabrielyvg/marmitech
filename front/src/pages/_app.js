import "@/styles/globals.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Header from "../components/Header";

library.add(fas, faTrashCan, faPenToSquare);


export default function App({ Component, pageProps }) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
        </>
    );
}