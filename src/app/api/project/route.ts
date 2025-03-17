import { createProject } from "@/app/lib/actions/project";
import { projectSchema } from "@/types/project";


export async function POST(req: Request) {
    try {
        const formData = await req.json();
        const data = projectSchema.parse(formData);
        const response = await createProject(data);
        return new Response(JSON.stringify(response), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error instanceof Error ? error.message: "error message" }), {
            headers: { "Content-Type": "application/json" },
        });
    }


}
