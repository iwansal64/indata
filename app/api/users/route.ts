import { check_authorization, connect_with_prisma } from "@/app/server-utils";

export async function GET(request: Request) {
    if (!(await check_authorization(request.headers))) {
        return new Response("Unauthorized Request!", {
            status: 401,
        });
    }

    const user_data_params = Object.fromEntries(new URL(request.url).searchParams.entries());
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
