"use client";

import { user } from "@prisma/client";
import { set_cookies } from "./server-utils";

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
    const response = await fetch(
        "/api/users/?name=" + user_data.name + "&email=" + user_data.email,
        {
            headers: {
                authorization: "9cuy92y1vcunc901",
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            "ERROR WHEN TRYING TO VALIDATE DATA HAS OCCURED; status-text:" + response.statusText
        );
    }

    let user_result = await response.json();

    if (user_result["total"] == 0) {
        return false;
    }

    user_result = user_result["results"][0];

    // Check if the password is correct
    if (user_result?.pass == user_data.pass) {
        set_cookies("indata-user-info", `${user_result.name}:${user_result.pass}`);
        return true;
    } else {
        return false;
    }
}

export async function add_user(user_data: user) {
    const response = await fetch("/api/users/", {
        method: "POST",
        body: JSON.stringify({
            new_data: user_data,
        }),
        headers: {
            authorization: "9cuy92y1vcunc901",
        },
    });

    if (!response.ok) {
        return {
            success: false,
            message: response.statusText,
        };
    }

    const results = await response.json();

    return {
        success: true,
        message: "Successfully register the user!",
        results: results,
    };
}

export const user_api_url = "/api/users";
