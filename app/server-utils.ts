"use server";
import { PrismaClient, user } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type SearchParams = { [key: string]: string | string[] | undefined };

export async function connect_with_prisma() {
    const prisma = new PrismaClient();
    await prisma.$connect();
    return prisma;
}

export async function must_login() {
    const login_info = await get_user_login_info();
    if (!login_info) {
        redirect("/login");
    }

    return login_info;
}

export async function get_user_login_info() {
    const user_cookies = cookies();
    const user_login_info = user_cookies.get("indata-user-info")?.value;
    if (!user_login_info || !user_login_info.includes(":")) {
        return false;
    }
    const [name, password] = user_login_info.split(":");

    const prisma = await connect_with_prisma();
    const result = await prisma.user.findFirst({
        where: {
            name,
        },
    });

    if (!result || result.pass != password) {
        return false;
    }

    return result;
}

export async function check_authorization(request_headers: Headers) {
    const authorization = request_headers.get("authorization");
    if (authorization && authorization == "9cuy92y1vcunc901") {
        return true;
    } else {
        return false;
    }
}

export async function set_cookies(name: string, value: string) {
    const user_cookies = cookies();
    user_cookies.set(name, value);
}
