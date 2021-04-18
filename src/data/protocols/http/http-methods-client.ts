import { HttpPostParams } from './http-params'

export interface HttpPostClient {
    url?: string
    body?: object
    post (params: HttpPostParams): Promise<void>

}
