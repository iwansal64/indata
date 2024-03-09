import { Suspense } from "react";
import AccountInfo from "./account-info";

export default async function AccountPage() {
    return (
        <>
            <div>
                <h1>Profile</h1>
                <Suspense fallback={<h1>Loading account info...</h1>}>
                    <AccountInfo />
                </Suspense>
            </div>
        </>
    );
}
