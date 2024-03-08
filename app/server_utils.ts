import { PrismaClient } from "@prisma/client";
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
    const [account, password] = user_login_info.split(":");

    const prisma = await connect_with_prisma();
    const result = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    name: account,
                },
                {
                    email: account,
                },
            ],
        },
    });

    if (!result || result.pass != password) {
        return false;
    }

    return result;
}

export async function validate_data() {}
