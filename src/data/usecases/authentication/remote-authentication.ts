import { HttpClient, HttpStatusCode } from '@/data/protocols/http/http-client'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials'
import { UnexpectedError } from '@/domain/errors/unexpected'
import { UserModel } from '@/domain/model/user-model'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { Validation } from '@/presentation/protocols/validation'

export class RemoteAuthentication implements Authentication {
    private readonly url: string
    private readonly httpClient: HttpClient<UserModel>
    private readonly validation: Validation

    constructor (url: string, httpClient: HttpClient<UserModel>, validation: Validation) {
        this.url = url
        this.httpClient = httpClient
        this.validation = validation
    }

    async auth (params: AuthenticationParams): Promise<UserModel> {

        const validationError = this.validation.validate(params)

        if (validationError) throw new Error(validationError.message)

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
