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

export async function getClients(){
    try {
        const clients = await prisma.client.findMany({
            include:{
                telephone:true,
                //nb of projects
                _count:{
                    select:{
                        projects:true
                    }
                },
            }
        });
        return clients;
    } catch (error) {
        console.log(error);
        return [];
    }
}