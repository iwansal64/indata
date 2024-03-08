"use server";
import Link from "next/link";
import { connect_with_prisma, must_login } from "../server-utils";
import styles from "./cluster.module.css";

export default async function UserClusters() {
    const prisma = await connect_with_prisma();
    const { id } = await must_login();

    const results = await prisma.cluster.findMany({
        where: {
            OR: [
                {
                    creator_id: id,
                },
                {
                    users: {
                        every: {
                            user: {
                                id: id,
                            },
                        },
                    },
                },
            ],
        },
    });

    return (
        <>
            {results.length > 0 ? (
                results.map((value, index) => {
                    return (
                        <Link
                            href={"/clusters/" + value.id + "/"}
                            className={styles.cluster}
                            key={index}
                        >
                            <h1>{value.cluster_name}</h1>
                            <p>{value.cluster_desc}</p>
                        </Link>
                    );
                })
            ) : (
                <h1>{"You Don't Have Any Clusters Yet"}</h1>
            )}
        </>
    );
}
