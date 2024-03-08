import { Suspense } from "react";
import styles from "./cluster.module.css";
import UserClusters from "./clusters-container";
import { Metadata } from "next";
import { connect_with_prisma } from "../server-utils";
import NavigationLink from "../navigation_link";

export const metadata: Metadata = {
    title: "Clusters : Dashboard",
};

export default async function Clusters() {
    return (
        <>
            <div className={styles.clusters}>
                <Suspense fallback={<h1>Please wait while fetching the data..</h1>}>
                    <div className="clusters">
                        <UserClusters />
                    </div>
                </Suspense>
            </div>
        </>
    );
}
