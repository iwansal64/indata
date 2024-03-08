import "./globals.css";
import MessageContainer from "./message-container";
import FixAutocomplete from "./fix_autocomplete";
import BreadCrumbs from "./breadcrumbs";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <BreadCrumbs />
                <MessageContainer />
                <FixAutocomplete />
                <div className="default_wrapper">{children}</div>
            </body>
        </html>
    );
}
