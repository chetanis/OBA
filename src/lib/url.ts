import { ReadonlyURLSearchParams } from "next/navigation"

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
    const paramsString = params.toString()
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`

    return `${pathname}${queryString}`
}

export const getQueryParams = (searchParams: Record<string, string | string[]>) => {
    const page = Number(searchParams.page) || 1
    const pageSize = Number(searchParams.pageSize) || 10
    const search = typeof searchParams.search === 'string' ? searchParams.search : ''
    const startDate = typeof searchParams.startDate === 'string' ? searchParams.startDate : undefined
    const endDate = typeof searchParams.endDate === 'string' ? searchParams.endDate : undefined
    const status = typeof searchParams.status === 'string' ? searchParams.status : undefined
    const type = typeof searchParams.type === 'string' ? searchParams.type : undefined

    return {
        page,
        pageSize,
        search,
        startDate,
        endDate,
        status,
        type,
    }
}