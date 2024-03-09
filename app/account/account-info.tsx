import { must_login } from "../server-utils";

export default async function AccountInfo() {
    const user_data = await must_login();

    return (
        <>
            <h2>Name: {user_data.name}</h2>
            <h2>Email: {user_data.email}</h2>
        </>
    );
}
