import { HttpClient, HttpStatusCode } from '@/data/protocols/http/http-client'
import { AddUser, SignUpParams } from '@/domain/usecases/signup'
import { UnexpectedError } from '@/domain/errors/unexpected'
import { UserModel } from '@/domain/model/user-model'
import { EmailInUseError } from '@/domain/errors/email-in-use'

export class RemoteAddUser implements AddUser {
    private readonly url: string
    private readonly httpClient: HttpClient<UserModel>

    constructor (url: string, httpClient: HttpClient<UserModel>) {
        this.url = url
        this.httpClient = httpClient
    }

    async signup (params: SignUpParams): Promise<UserModel> {

        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'post',
            body: params
        })

        switch (httpResponse.statusCode) {
            case HttpStatusCode.success: return httpResponse.body
            case HttpStatusCode.forbidden: throw new EmailInUseError()
            default: throw new UnexpectedError()
        }
    }
}
