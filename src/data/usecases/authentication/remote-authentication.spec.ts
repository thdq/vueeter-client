import faker from 'faker'
import { HttpPostClient } from "@/data/protocols/http/http-methods-client"
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { HttpPostParams } from '@/data/protocols/http/http-params'
import { RemoteAuthentication } from "./remote-authentication"

interface SutType {
    sut: RemoteAuthentication
    httpPostClientStub: HttpPostClient
}

const makeHttpPostClient = (): HttpPostClient => {

    class HttpPostClientStub implements HttpPostClient {
        url?: string
        body?: object

        post (params: HttpPostParams): Promise<void> {

            const { url, body } = params

            this.url = url
            this.body = body
            return Promise.resolve()
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

})
