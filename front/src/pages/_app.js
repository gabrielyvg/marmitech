import "@/styles/globals.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faTrashCan, faPenToSquare, faSortDown, faKitchenSet } from '@fortawesome/free-solid-svg-icons';
import Menu from "../components/Menu";
import { useRouter } from 'next/router';
import 'primeicons/primeicons.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

library.add(fas, faTrashCan, faPenToSquare, faSortDown, faKitchenSet);

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const showMenu = router.pathname !== '/';

    return (
        <>
            <PrimeReactProvider>
                {showMenu && <Menu />}
                <div className='ml-72'>
                    <Component {...pageProps} />
                </div>
            </PrimeReactProvider>
        </>
    );
}