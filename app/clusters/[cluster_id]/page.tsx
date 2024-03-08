import Link from "next/link";
import styles from "./clusterid.module.css";
import NavigationLink from "@/app/navigation_link";

export default async function Cluster({ params }: { params: { cluster_id: string } }) {
    const cluster_id = params["cluster_id"];

    return (
        <>
            <div className=""></div>
        </>
    );
}
