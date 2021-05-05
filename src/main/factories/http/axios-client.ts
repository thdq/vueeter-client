import { HttpRequest, HttpResponse, HttpClient, HttpMethod, HttpStatusCode } from '@/data/protocols/http/http-client'

import axios, { AxiosResponse } from 'axios'

class AxiosHttpClient implements HttpClient {
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

            if (error.status) {

                axiosResponse = error.response

            } else {
                axiosResponse = Object.assign({}, {
                    status: HttpStatusCode.notFound,
                    data: error.message
                }) as any
            }

        }

        return {
            statusCode: axiosResponse.status,
            body: axiosResponse.data
        }
    }
}

export const makeAxiosHttpClient = (): AxiosHttpClient => new AxiosHttpClient()
