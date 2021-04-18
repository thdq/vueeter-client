import { HttpPostClient } from '@/data/protocols/http/http-methods-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials'
import { AuthenticationParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication {
    private readonly url: string
    private readonly httpPostClient: HttpPostClient

    constructor (url: string, httpPostClient: HttpPostClient) {
        this.url = url
        this.httpPostClient = httpPostClient
    }

    async auth (params: AuthenticationParams): Promise<void> {

        const httpResponse = await this.httpPostClient.post({
            url: this.url,
            body: params
        })

        switch (httpResponse.statusCode) {
            case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
            default: return Promise.resolve()
        }

    }
}
