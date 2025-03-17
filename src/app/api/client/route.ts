import { createClient } from "@/app/lib/actions/client";
import { clientSchema } from "@/types/client";



export async function POST(req: Request) {
    try {
        const formData = await req.json();
        const data = clientSchema.parse(formData);
        const response = await createClient(data);
        return new Response(JSON.stringify(response), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error instanceof Error ? error.message: "error message" }), {
            headers: { "Content-Type": "application/json" },
        });
    }


}
