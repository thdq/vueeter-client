import faker from 'faker'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials'
import { UnexpectedError } from '@/domain/errors/unexpected'
import { HttpPostClient } from "@/data/protocols/http/http-methods-client"
import { HttpPostParams } from '@/data/protocols/http/http-params'
import { HttpResponse, HttpStatusCode } from '@/data/protocols/http/http-response'
import { RemoteAuthentication } from "./remote-authentication"

interface SutType {
    sut: RemoteAuthentication
    httpPostClientStub: HttpPostClient
}

const makeHttpPostClient = (): HttpPostClient => {

    class HttpPostClientStub implements HttpPostClient {
        url?: string
        body?: object
        response: HttpResponse = {
            statusCode: HttpStatusCode.success
        }

        post (params: HttpPostParams): Promise<HttpResponse> {

            const { url, body } = params

            this.url = url
            this.body = body
            return Promise.resolve(this.response)
        }
    }

    return new HttpPostClientStub()

}

const makeSut = (url: string = faker.internet.url()): SutType => {

    const httpPostClientStub = makeHttpPostClient()
    const sut = new RemoteAuthentication(url, httpPostClientStub)

    return {
        sut,
        httpPostClientStub
    }
}

describe('RemoteAuthentication', () => {

    test('Should call HttpPostClient with correct URL', async () => {

        const url = '_other_url'

        const { sut, httpPostClientStub } = makeSut(url)

        const authParams: AuthenticationParams = {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        await sut.auth(authParams)

        expect(httpPostClientStub.url).toBe(url)

    })

    test('Should call HttpPostClient with correct body', async () => {

        const { sut, httpPostClientStub } = makeSut()

        const authParams: AuthenticationParams = {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        await sut.auth(authParams)

        expect(httpPostClientStub.body).toEqual(authParams)

    })

    test('Should throw if HttpPostClient returns 401 on InvalidCredentialsError', async () => {

        const { sut, httpPostClientStub } = makeSut()

        httpPostClientStub.response = {
            statusCode: HttpStatusCode.unathorized
        }

        const authParams: AuthenticationParams = {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        const promise = sut.auth(authParams)

        await expect(promise).rejects.toThrow(new InvalidCredentialsError())

    })

    test('Should throw if HttpPostClient returns 400 on UnexpectedError', async () => {

        const { sut, httpPostClientStub } = makeSut()

        httpPostClientStub.response = {
            statusCode: HttpStatusCode.badRequest
        }

        const authParams: AuthenticationParams = {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        const promise = sut.auth(authParams)

        await expect(promise).rejects.toThrow(new UnexpectedError())

    })

})
