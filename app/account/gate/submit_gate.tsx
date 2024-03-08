"use client";
import { show_message } from "@/app/client-utils";
import styles from "./login.module.css";
import { validate_data } from "@/app/client-utils";
import { user } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function SubmitGate() {
    const router = useRouter();
    const handle_submit = async () => {
        let error = "";

        const input_data: { [key: string]: string } = {};

        const input_fields = Array.from(document.querySelectorAll("form > div"));
        input_fields.forEach((input_field) => {
            const input_field_childrens = Array.from(input_field.children);

            const key_value_pair: (string | undefined)[] = ["", ""];
            input_field_childrens.forEach((element) => {
                const input = element as HTMLInputElement | null;

                if (element?.tagName == "INPUT") {
                    key_value_pair[0] = input?.id;
                    key_value_pair[1] = input?.value;
                }
            });
            if (!key_value_pair[0] || !key_value_pair[1]) {
                error = "Data is not complete!";
                return;
            }

            input_data[key_value_pair[0]] = key_value_pair[1];
        });

        if (error) {
            show_message({ message: error, delay: 2000 });
            return;
        }

        const user_data: user = {
            name: input_data["account"] || input_data["username"],
            pass: input_data["password"],
            email: input_data["account"] || input_data["email"],
            id: "",
        };

        if (await validate_data(user_data)) {
            show_message({
                message: "Wrong account / password",
                delay: 2000,
                after_done_function: () => {
                    router.push("/");
                },
            });
        } else {
            show_message({ message: "Wrong account / password", delay: 2000 });
        }
    };

    return (
        <>
            <button onClick={handle_submit} className={styles.submit} type="button">
                Submit
            </button>
        </>
    );
}
