import { HttpPostParams } from './http-params'
import { HttpResponse } from './http-response'

export interface HttpPostClient {
    url?: string
    body?: object
    response: HttpResponse
    post (params: HttpPostParams): Promise<HttpResponse>

}
