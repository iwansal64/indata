import "./globals.css";
import MessageContainer from "./message-container";
import FixAutocomplete from "./fix_autocomplete";
import BreadCrumbs from "./breadcrumbs";
import { get_user_login_info } from "./server-utils";
import { Suspense } from "react";
import { MustLogin } from "./must-login-component";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {(async () => {
                    if (await get_user_login_info()) {
                        return <BreadCrumbs />;
                    } else {
                        return <></>;
                    }
                })()}
                <MessageContainer />
                <FixAutocomplete />
                <div className="default_wrapper">{children}</div>
                <Suspense>
                    <MustLogin />
                </Suspense>
            </body>
        </html>
    );
}
