import { Metadata } from "next";
import styles from "./page.module.css";
import Link from "next/link";
import { must_login } from "./server-utils";

export const metadata: Metadata = {
    title: "INDATA: NextGen Data Management",
};

export default async function Home() {
    must_login().then((user_data) => {});

    return (
        <>
            <Link href="clusters" className={styles.cluster}>
                Clusters
            </Link>
        </>
    );
}
