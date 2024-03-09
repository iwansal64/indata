import { check_authorization, connect_with_prisma } from "@/app/server-utils";
import { NextRequest } from "next/server";
import { user } from "@prisma/client";
import { is_user } from "@/app/utils";
import { validate_data } from "@/app/client-utils";

export async function GET(request: NextRequest) {
    if (!(await check_authorization(request.headers))) {
        return new Response("Unauthorized Request!", {
            status: 401,
        });
    }

    const user_data_params = Object.fromEntries(request.nextUrl.searchParams.entries());
    console.log(user_data_params);
    const prisma = await connect_with_prisma();

    const user_results = await prisma.user.findMany({
        where: {
            OR: [
                {
                    name: user_data_params["name"],
                },
                {
                    email: user_data_params["email"],
                },
                {
                    pass: user_data_params["pass"],
                },
            ],
        },
    });

    return Response.json({
        success: true,
        total: user_results.length,
        results: user_results,
    });
}

export async function POST(request: NextRequest) {
    if (!(await check_authorization(request.headers))) {
        return new Response("Unauthorized Request!", {
            status: 401,
        });
    }

    const request_body = await request.json();

    if (!Object.keys(request_body).includes("new_data")) {
        return new Response("Body params not complete!", {
            status: 400,
        });
    }

    const user_data = request_body["new_data"];
    if (!is_user(user_data)) {
        return new Response("Body new_data param is not correct!", {
            status: 400,
        });
    }

    const prisma = await connect_with_prisma();

    //? Check if the account is already inside the database
    const user_result = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    name: user_data.name,
                },
                {
                    email: user_data.email,
                },
            ],
        },
    });

    if (user_result) {
        return new Response("Account is already created before!", {
            status: 400,
        });
    }

    //? Creating data inside the database
    const prisma_result = await prisma.user.create({
        data: {
            name: user_data.name,
            pass: user_data.pass,
            email: user_data.email,
        },
    });

    return Response.json({
        success: true,
        results: prisma_result,
    });
}
