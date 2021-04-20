import { HttpPostClient } from "@/data/protocols/http/http-methods-client"
import { HttpPostParams } from "@/data/protocols/http/http-params"
import { HttpResponse } from "@/data/protocols/http/http-response"
import axios from 'axios'

export class AxiosClient implements HttpPostClient<any, any> {

    async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {

        const httpResponse = await axios.post(params.url, params.body)

        return {
            statusCode: httpResponse.status,
            body: httpResponse.data
        }

    }

}
