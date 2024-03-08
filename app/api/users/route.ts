import { check_authorization, connect_with_prisma } from "@/app/server-utils";
import { NextRequest } from "next/server";

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
