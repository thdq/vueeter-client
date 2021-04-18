export enum HttpStatusCode {
    success = 200,
    noContent = 204,
    badRequest = 400,
    unathorized = 401,
    notFound = 404
}

export type HttpResponse = {
    statusCode: HttpStatusCode
    body?: object
}
