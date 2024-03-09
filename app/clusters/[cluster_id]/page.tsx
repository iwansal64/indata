import Link from "next/link";
import styles from "./clusterid.module.css";
import BreadCrumbs from "@/app/breadcrumbs";
import { must_login } from "@/app/server-utils";

export default async function Cluster({ params }: { params: { cluster_id: string } }) {
    const user_id = await must_login();
    const cluster_id = params["cluster_id"];

    return (
        <>
            <div className=""></div>
        </>
    );
}
