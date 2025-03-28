"use server";

import { ProjectFormData, projectSchema } from "@/types/project";
import { ProjectStatus, TacheStatus } from "@prisma/client";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";
import prisma from "../prisma";


export async function createProject(inupt: ProjectFormData) {
    try {

        console.log(inupt.finalPrice);
        
        const data = projectSchema.parse(inupt);

        // Handle image upload if an image file is present
        let imgPath: string | null = null;
        if (data.img instanceof File) {
            const uploadDir = path.join(process.cwd(), "public/uploads");
            const fileName = `${Date.now()}-${data.img.name}`;
            const filePath = path.join(uploadDir, fileName);
            const buffer = await data.img.arrayBuffer();
            await writeFile(filePath, Buffer.from(buffer));
            imgPath = `/uploads/${fileName}`; // Store relative path
        }

        // Create the project in the database
        const project = await prisma.project.create({
            data: {
                ...data,
                status: ProjectStatus.EN_ATTENTE,
                img: imgPath,
                taches: undefined
            },
        });

        // Handle task creation logic
        if (data.nbTaches === 1) {
            // Create a single task with all plaques
            await prisma.tache.create({
                data: {
                    nbPlaque_Film: data.nbPlaque_Film,
                    projectId: project.id,
                    currentState: TacheStatus.EN_ATTENTE, // Default status
                },
            });
        } else if (data.taches) {
            // Create multiple tasks if `taches` list is provided
            for (const tache of data.taches) {
                await prisma.tache.create({
                    data: {
                        nbPlaque_Film: tache.nbPlaque_Film,
                        projectId: project.id,
                        currentState: TacheStatus.EN_ATTENTE,
                    },
                });
            }
        }

        revalidatePath(`/Client/${data.clientId}`)

        return { success: true, data: project };
    } catch (error) {
        console.error("Erreur lors de la création du projet:", error);
        return { success: false, error: error instanceof Error ? error.message : "Erreur lors de la création du projet" };
    }
}
