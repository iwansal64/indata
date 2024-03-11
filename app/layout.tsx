import "./globals.css";
import MessageContainer from "./message-container";
import FixAutocomplete from "./fix_autocomplete";
import { Suspense } from "react";
import { MustLoginComponents } from "./must-login-component";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Suspense>
                    <MustLoginComponents />
                </Suspense>
                <MessageContainer />
                <FixAutocomplete />
                <div className="default_wrapper">{children}</div>
            </body>
        </html>
    );
}
