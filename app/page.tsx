import { Metadata } from "next";
import styles from "./page.module.css";
import Link from "next/link";
import { must_login } from "./server_utils";

export const metadata: Metadata = {
    title: "INDATA: NextGen Data Management",
};

export default async function Home() {
    const user_data = await must_login();

    return (
        <>
            <Link href="clusters" className={styles.cluster}>
                Clusters
            </Link>
        </>
    );
}
