import { user } from "@prisma/client";

export function is_user(value: user): value is user {
    value = <user>value;
    const return_value =
        value.name !== undefined && value.email !== undefined && value.pass !== undefined;
    return return_value;
}
