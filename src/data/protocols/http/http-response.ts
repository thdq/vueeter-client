export enum HttpStatusCode {
    success = 200,
    noContent = 204,
    badRequest = 400,
    unathorized = 401
}

export type HttpResponse = {
    statusCode: HttpStatusCode
    body?: object
}
