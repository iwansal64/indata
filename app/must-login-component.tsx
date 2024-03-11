import { redirect } from "next/navigation";
import BreadCrumbs from "./breadcrumbs";
import { get_user_login_info, must_login } from "./server-utils";

export async function MustLogin() {
    await must_login();
    return <></>;
}

export async function MustLoginComponents() {
    if (await must_login()) {
        return (
            <>
                <BreadCrumbs />
            </>
        );
    } else {
        return <></>;
    }
}
