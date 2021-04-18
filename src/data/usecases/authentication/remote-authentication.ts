import { HttpPostClient } from '@/data/protocols/http/http-methods-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials'
import { UnexpectedError } from '@/domain/errors/unexpected'
import { UserModel } from '@/domain/model/user-model'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication implements Authentication {
    private readonly url: string
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, UserModel>

    constructor (url: string, httpPostClient: HttpPostClient<AuthenticationParams, UserModel>) {
        this.url = url
        this.httpPostClient = httpPostClient
    }

    async auth (params: AuthenticationParams): Promise<UserModel> {

        const httpResponse = await this.httpPostClient.post({
            url: this.url,
            body: params
        })

        switch (httpResponse.statusCode) {
            case HttpStatusCode.success: return httpResponse.body
            case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
            default: throw new UnexpectedError()
        }

    }
}
