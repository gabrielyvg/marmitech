import "@/styles/globals.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faTrashCan, faPenToSquare, faSortDown, faKitchenSet } from '@fortawesome/free-solid-svg-icons';
import Menu from "../components/Menu";
import { useRouter } from 'next/router';

library.add(fas, faTrashCan, faPenToSquare, faSortDown, faKitchenSet);

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const showMenu = router.pathname !== '/';

    return (
        <>
            {showMenu && <Menu />}
            <div className='ml-72'>
                <Component {...pageProps} />
            </div>
        </>
    );
}