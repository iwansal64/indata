"use client";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function ChangeGateBtn({
    target_gate,
    text,
}: {
    target_gate: string;
    text: string;
}) {
    const router = useRouter();
    const change_gate = () => {
        const target_url = "/account/gate/?gate_type=" + target_gate;

        router.push(target_url);
    };

    return (
        <button
            onClick={change_gate}
            className={styles.change_gate}
            type="button"
        >
            {text}
        </button>
    );
}
