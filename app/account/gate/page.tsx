import styles from "./login.module.css";
import { Metadata } from "next";
import { connect_with_prisma, type SearchParams } from "@/app/server-utils";
import ChangeGateBtn from "./change-gate";
import SubmitGate from "./submit-gate";

export const metadata: Metadata = {
    title: "Login",
};

export default async function Login({ searchParams }: { searchParams: SearchParams }) {
    let gate_type: string | string[] | undefined = "login";
    if (searchParams) {
        gate_type = searchParams["gate_type"];
    }

    return (
        <>
            <div className={styles.main_wrapper}>
                <h1>{gate_type == "login" ? "Log In" : "Sign In"}</h1>
                <form className={styles.main_form}>
                    {(() => {
                        if (gate_type == "login") {
                            return (
                                <>
                                    <div className={styles.account}>
                                        <label htmlFor="account">Username or Email :</label>
                                        <input type="text" id="account" className={styles.input} />
                                    </div>

                                    <div className={styles.password}>
                                        <label htmlFor="password">Password :</label>
                                        <input
                                            type="password"
                                            id="password"
                                            className={styles.input}
                                        />
                                    </div>
                                </>
                            );
                        } else {
                            return (
                                <>
                                    <div className={styles.username}>
                                        <label htmlFor="username">Username :</label>
                                        <input type="text" id="username" className={styles.input} />
                                    </div>
                                    <div className={styles.email}>
                                        <label htmlFor="email">Email :</label>
                                        <input type="text" id="email" className={styles.input} />
                                    </div>

                                    <div className={styles.password}>
                                        <label htmlFor="password">Create Password :</label>
                                        <input
                                            type="password"
                                            id="password"
                                            className={styles.input}
                                        />
                                    </div>

                                    <div className={styles.password}>
                                        <label htmlFor="password-confirm">Confirm Password :</label>
                                        <input
                                            type="password"
                                            id="password-confirm"
                                            className={styles.input}
                                        />
                                    </div>
                                </>
                            );
                        }
                    })()}
                    <ChangeGateBtn
                        target_gate={gate_type == "login" ? "signin" : "login"}
                        text={gate_type == "login" ? "Sign In" : "Log In"}
                    />
                    <SubmitGate />
                </form>
            </div>
        </>
    );
}
