export type HttpMethod = 'post' | 'get' | 'put' | 'delete'
export interface HttpRequest {
    url: string
    method: HttpMethod
    body?: any
    headers?: any
}

export enum HttpStatusCode {
    success = 200,
    created = 201,
    noContent = 204,
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    serverError = 500
}

export interface HttpResponse<T = any> {
    statusCode: HttpStatusCode
    body?: T
}

export interface HttpClient<R = any> {
    url?: string
    method: HttpMethod
    body?: any
    headers?: any
    response: HttpResponse<R>

    request: (data: HttpRequest) => Promise<HttpResponse<R>>
}
