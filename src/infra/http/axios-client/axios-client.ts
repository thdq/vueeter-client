import { HttpPostParams } from "@/data/protocols/http/http-params"
import axios from 'axios'

export class AxiosClient {

    async post (params: HttpPostParams<any>): Promise<void> {

        await axios(params.url)

    }

}
