import "./globals.css";
import MessageContainer from "./message_container";
import FixAutocomplete from "./fix_autocomplete";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
                <MessageContainer />
                <FixAutocomplete />
            </body>
        </html>
    );
}
