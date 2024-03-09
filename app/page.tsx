import { Metadata } from "next";
import styles from "./page.module.css";
import NavBar from "./navbar";

export const metadata: Metadata = {
    title: "INDATA: NextGen Data Management",
};

export default async function Home() {
    return (
        <>
            <NavBar />
        </>
    );
}
