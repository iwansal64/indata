"use client";

export function show_message({
    message,
    delay = 0,
    after_done_function: after_delay_function = () => {},
}: {
    message: string;
    delay?: number;
    after_done_function?: Function;
}) {
    const message_container = document.getElementsByClassName("message-container")[0];
    const text_container = document.querySelector("div.message-container > h1");

    if (!text_container) {
        return false;
    }

    text_container.innerHTML = message;
    message_container.classList.add("active");

    if (delay) {
        setTimeout(() => {
            message_container.classList.remove("active");
            after_delay_function();
        }, delay);
    } else {
        return () => {
            message_container.classList.remove("active");
            after_delay_function();
        };
    }

    return true;
}

export function fix_autocomplete_inputs() {
    const fix_autocomplete = (element: HTMLInputElement) => {
        setTimeout(() => {
            const input_clone = element.cloneNode(true) as HTMLInputElement;
            input_clone.addEventListener("change", () => {
                console.log("INPUT");
                fix_autocomplete(input_clone);
            });

            if (element.parentElement) {
                console.log("SWITCHED");

                element.parentElement.appendChild(input_clone);
                element.parentElement.removeChild(element);
            }
        }, 10);
    };

    Array.from(document.getElementsByTagName("input")).forEach((element) => {
        element.addEventListener("change", () => {
            console.log("INPUT");
            fix_autocomplete(element);
        });
    });
}

export async function validate_data(user_data: user) {
    const prisma = await connect_with_prisma();

    // Get user data from account info
    const user_result = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    name: user_data.name,
                },
                {
                    email: user_data.email,
                },
            ],
        },
    });

    // Check if the password is correct
    if (user_result?.pass == user_data.pass) {
        const cookies = require("next/headers");
        const user_cookies = cookies();

        user_cookies.set("indata-user-info", `${user_result.name}:${user_result.pass}`);

        return true;
    } else {
        return false;
    }
}
