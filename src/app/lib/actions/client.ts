'use server'

import { ClientFormData, clientSchema, EmployeFormData, employeSchema } from "@/types/client";
import prisma from "../prisma";




export async function createClient(input: ClientFormData) {
    try {
        const clientData = clientSchema.parse(input);
        const client = await prisma.client.create({
            data: {
                ...clientData,
                telephone: {
                    create: clientData.telephone
                },
                employes: {
                    create: clientData.employes?.map(employe => ({
                        nom: employe.nom,
                        telephone: {
                            create: employe.telephone
                        }
                    }))
                },
            }
        })

        return { success: true, data: client }

    } catch (error) {
        console.log(error);
        return { success: false, error: error instanceof Error ? error.message : "une erreur s'est produite" };
    }
}

export async function updateClient(id: number, input: ClientFormData) {
    try {

        // we remove the employes from the client data
        const {employes,...clientData} = clientSchema.parse(input);


        const updatedClient = await prisma.client.update({
            where: { id }, 
            data: {
                ...clientData,
                telephone: {
                    deleteMany: {}, 
                    create: clientData.telephone,
                },
            },
        });

        return { success: true, data: updatedClient };
    } catch (error) {
        console.log(error);
        return { success: false, error: error instanceof Error ? error.message : "une erreur s'est produite" };
    }
}

export async function deleteClient(id: number) {
    try {
        await prisma.client.delete({ where: { id } });
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false, error: error instanceof Error ? error.message : "une erreur s'est produite" };
    }
}

export async function addEmploye(clientId: number, employe: EmployeFormData) {
    try {
        const employeData = employeSchema.parse(employe);
        const createdEmploye = await prisma.employe.create({
            data: {
                ...employeData,
                telephone: {
                    create: employeData.telephone
                },
                client: {
                    connect: { id: clientId }
                }
            }
        });

        return { success: true, data: createdEmploye };
    } catch (error) {
        console.log(error);
        return { success: false, error: error instanceof Error ? error.message : "une erreur s'est produite" };
    }
}

export async function updateEmploye(id: number, employe: EmployeFormData) {
    try {
        const employeData = employeSchema.parse(employe);
        const updatedEmploye = await prisma.employe.update({
            where: { id },
            data: {
                ...employeData,
                telephone: {
                    deleteMany: {},
                    create: employeData.telephone
                }
            }
        });

        return { success: true, data: updatedEmploye };
    } catch (error) {
        console.log(error);
        return { success: false, error: error instanceof Error ? error.message : "une erreur s'est produite" };
    }
}

export async function deleteEmploye(id: number) {
    try {
        await prisma.employe.delete({ where: { id } });
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false, error: error instanceof Error ? error.message : "une erreur s'est produite" };
    }
}

export async function getClients() {
    try {
        const clients = await prisma.client.findMany({
            select: {
                id: true, // Ajout de l'ID pour correspondre au type attendu
                nom: true,
                nomCommercial: true,
                email: true,
                telephone: {
                    select: {
                        number: true, // Récupérer uniquement le numéro de téléphone
                    }
                },
                _count: {
                    select: {
                        projects: true, // Nombre de projets associés
                    }
                }
            }
        });
        return clients;
    } catch (error) {
        console.error("Erreur lors de la récupération des clients:", error);
        return [];
    }
}


export async function getClientById(id: number) {
    try {
        const client = await prisma.client.findUnique({
            where:{ id: Number(id) },
            include: {
                telephone: true,   // Inclure les téléphones associés
                employes: true,    // Inclure les employés associés
                projects: true     // Inclure les projets associés
            }
        });

        return client;
    } catch (error) {
        console.error("Erreur lors de la récupération du client:", error);
        return null;
    }
}
