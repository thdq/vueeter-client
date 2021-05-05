import { HttpRequest, HttpResponse, HttpClient, HttpMethod } from '@/data/protocols/http/http-client'

import axios, { AxiosResponse } from 'axios'

export class AxiosClient implements HttpClient {
    url?: string
    method: HttpMethod
    body?: any
    headers?: any
    response: HttpResponse<any>

    async request (data: HttpRequest): Promise<HttpResponse> {

        let axiosResponse: AxiosResponse

        try {

            axiosResponse = await axios.request({
                url: data.url,
                method: data.method,
                data: data.body,
                headers: data.headers
            })

        } catch (error) {
            axiosResponse = error.response ?? error.message
        }

        return {
            statusCode: axiosResponse.status,
            body: axiosResponse.data
        }
    }
}
