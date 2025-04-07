import { Prisma, ProjectStatus, ProjectType } from "@prisma/client"

export interface SearchParams {
    search: string
    startDate?: string
    endDate?: string
    status?: string
    type?: string,
}


export function buildProjectWhereClause(params: SearchParams) {
    const { search, startDate, endDate, status, type } = params;
    let where: Prisma.ProjectWhereInput = {};

    // Search conditions
    if (search) {

        where = {
            OR: [
                {nom : { contains: search } },
                {
                    client:{
                        OR:[
                            {nom : { contains: search } },
                        ]
                    }
                },
                { note: { contains: search } }
            ]
        };
    }

    // Status conditions
    if (status) {
        where = {
            ...where,
            status: status as ProjectStatus
        };
    }

    // Type conditions
    if (type) {
        where = {
            ...where,
            type: type as ProjectType
        };
    }

    // Normalize startDate and endDate
    const normalizedStartDate = startDate ? new Date(startDate) : undefined;
    if (normalizedStartDate) {
        normalizedStartDate.setHours(0, 0, 0, 0); // Start of the day
    }

    const normalizedEndDate = endDate ? new Date(endDate) : undefined;
    if (normalizedEndDate) {
        normalizedEndDate.setHours(23, 59, 59, 999); // End of the day
    }

    // Date range conditions
    if (normalizedStartDate || normalizedEndDate) {
        where = {
            ...where,
            createdAt: {
                ...(normalizedStartDate && { gte: normalizedStartDate }),
                ...(normalizedEndDate && { lte: normalizedEndDate })
            }
        };
    }

    return where;
}