import "@/styles/globals.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faTrashCan, faPenToSquare, faSortDown } from '@fortawesome/free-solid-svg-icons';
import Header from "../components/Header";

library.add(fas, faTrashCan, faPenToSquare, faSortDown);


export default function App({ Component, pageProps }) {
    return (
        <>
            <Header />
            <div className='ml-64'>
                <Component {...pageProps} />
            </div>
        </>
    );
}