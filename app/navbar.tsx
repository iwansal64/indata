import Image from "next/image";
import Link from "next/link";

function Logo() {
    return <Image alt="Logo" src="/logo.png" width={100} height={100} priority />;
}

export default async function NavBar() {
    return (
        <>
            <nav className="nav_bar">
                <div className="logo">
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>
                <Link href="clusters" className="cluster">
                    Clusters
                </Link>
                <Link href="account" className="account">
                    Account
                </Link>
            </nav>
        </>
    );
}
