"use client";

export function show_message({ message, delay = 0 }: { message: string; delay: number }) {
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
        }, delay);
    } else {
        return () => {
            message_container.classList.remove("active");
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
