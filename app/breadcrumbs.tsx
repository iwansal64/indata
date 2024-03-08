"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadCrumbs() {
    const paths: { [key: string]: string } = {
        home: "/",
    };

    const pathnames = (usePathname() + "/").split("/").slice(1, -1);
    pathnames.forEach((route, index) => {
        const link_value = "/" + pathnames.slice(0, index + 1).join("/") + "/";
        if (index > 0) {
            if (pathnames[index - 1] == "clusters") {
                route = `cluster_id:${route}`;
            }
        }
        paths[route] = link_value;
    });

    return (
        <div className="navigation_link">
            {Object.keys(paths).map((path, index) => {
                if (path) {
                    if (index > 0) {
                        return (
                            <span key={index}>
                                {" > "}
                                <Link href={paths[path]}>{path}</Link>
                            </span>
                        );
                    } else {
                        return (
                            <span key={index}>
                                <Link href={paths[path]}>{path}</Link>
                            </span>
                        );
                    }
                }
            })}
        </div>
    );
}
