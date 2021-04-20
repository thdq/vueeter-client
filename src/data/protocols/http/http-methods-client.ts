import { HttpPostParams } from './http-params'
import { HttpResponse } from './http-response'

export interface HttpPostClient<T, R> {
    url?: string
    body?: T
    response?: HttpResponse<R>
    post (params: HttpPostParams<T>): Promise<HttpResponse<R>>

}
