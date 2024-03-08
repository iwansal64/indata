"use client";
import { show_message } from "@/app/utils";
import styles from "./login.module.css";

export default function SubmitGate() {
    const handle_submit = () => {
        let error = "";

        const user_data: { [key: string]: string } = {};

        const input_fields = Array.from(document.querySelectorAll("form > div"));
        input_fields.forEach((input_field) => {
            const input_field_childrens = Array.from(input_field.children);

            const key_value_pair: (string | undefined)[] = ["", ""];
            input_field_childrens.forEach((element) => {
                const input = element as HTMLInputElement | null;

                if (element?.tagName == "LABEL") {
                    key_value_pair[0] = element.innerHTML;
                } else if (element?.tagName == "INPUT") {
                    key_value_pair[1] = input?.value;
                }
            });
            if (!key_value_pair[0] || !key_value_pair[1]) {
                error = "Data is not complete!";
                return;
            }

            user_data[key_value_pair[0]] = key_value_pair[1];
        });

        if (error) {
            show_message({ message: error, delay: 2000 });
        }
        console.log(user_data);
    };

    return (
        <>
            <button onClick={handle_submit} className={styles.submit} type="button">
                Submit
            </button>
        </>
    );
}
