import styles from "@/styles/Header.module.css";
import Image from "next/image";
import Link from 'next/link';
import mockObject from '../utils/mock';

export default function Header() {
    return (
        <header>
            <nav className={styles.navbar}>
                {mockObject.menuOptions.map((menu) => (
                    <div className={styles.menu} key={menu.id}>
                        <Link href={'/'} className={styles.menuItem}>{menu.title}</Link>
                    </div>
                ))}
                <div className={styles.user}>
                    <Image src="/pinguim.jpg" width="40" height="40" alt="Foto usuario" className={styles.userImg} />
                </div>
            </nav>
        </header>
    );
}
