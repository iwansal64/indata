import { Metadata } from "next";
import styles from "./page.module.css";
import Link from "next/link";
import { must_login } from "./server-utils";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "INDATA: NextGen Data Management",
};

export default async function Home() {
    return (
        <>
            <Link href="clusters" className={styles.cluster}>
                Clusters
            </Link>
            <Suspense>
                {(async () => {
                    await must_login();
                    return <></>;
                })()}
            </Suspense>
        </>
    );
}
