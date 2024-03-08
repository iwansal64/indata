"use server";
import { connect_with_prisma, must_login } from "../server-utils";
import styles from "./cluster.module.css";

export default async function Clusters() {
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
            <div className={styles.sclusters}>
                {results ? (
                    results.map((value, index) => {
                        return (
                            <div className={styles.cluster} key={index}>
                                <h1>{value.cluster_name}</h1>
                            </div>
                        );
                    })
                ) : (
                    <h1>{"You Don't Have Any Clusters Yet"}</h1>
                )}
            </div>
        </>
    );
}
