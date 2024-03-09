import { must_login } from "./server-utils";

export async function MustLogin() {
    await must_login();
    return <></>;
}
