import { HttpClient, HttpStatusCode } from '@/data/protocols/http/http-client'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials'
import { UnexpectedError } from '@/domain/errors/unexpected'
import { UserModel } from '@/domain/model/user-model'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication implements Authentication {
    private readonly url: string
    private readonly httpClient: HttpClient<UserModel>

    constructor (url: string, httpClient: HttpClient<UserModel>) {
        this.url = url
        this.httpClient = httpClient
    }

    async auth (params: AuthenticationParams): Promise<UserModel> {

        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'post',
            body: params

        })

        switch (httpResponse.statusCode) {
            case HttpStatusCode.success: return httpResponse.body
            case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
            default: throw new UnexpectedError()
        }

    }
}
