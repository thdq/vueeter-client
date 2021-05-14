import { HttpClient, HttpMethod, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols/http/http-client'
import { EmailInUseError } from '@/domain/errors/email-in-use'
import { UnexpectedError } from '@/domain/errors/unexpected'
import { UserModel } from '@/domain/model/user-model'
import { SignUpParams } from '@/domain/usecases/signup'
import faker from 'faker'
import { RemoteAddUser } from './remote-add-user'

interface SutTypes {
    sut: RemoteAddUser
    httpClientStub: HttpClient<UserModel>
}

const makeHttpClient = (): HttpClient<UserModel> => {

    class HttpClientStub<R> implements HttpClient<R> {
        url?: string
        method: HttpMethod
        body?: any
        headers?: any
        response: HttpResponse<R> = {
            statusCode: HttpStatusCode.success
        }

        async request (data: HttpRequest): Promise<HttpResponse<R>> {

            this.url = data.url
            this.method = data.method
            this.body = data.body
            this.headers = data.headers

            return await this.response

        }
    }

    return new HttpClientStub()

}

const makeSut = (url: string = faker.internet.url()): SutTypes => {

    const httpClientStub = makeHttpClient()
    const sut = new RemoteAddUser(url, httpClientStub)
    return {
        sut,
        httpClientStub
    }
}

describe('RemoteAddUser', () => {

    test('Should call HttpClient with correct values', async () => {

        const url = faker.internet.url()

        const { sut, httpClientStub } = makeSut(url)

        const password = faker.internet.password()

        const formParams: SignUpParams = {
            birth_date: faker.datatype.datetime().toISOString(),
            email: faker.internet.email(),
            name: faker.random.words(),
            password,
            passwordConfirm: password,
            username: faker.internet.userName()
        }

        await sut.signup(formParams)

        expect(httpClientStub.url).toBe(url)

        expect(httpClientStub.method).toBe('post')

        expect(httpClientStub.body).toEqual(formParams)

    })

    test('Should throw EmailInUseError if HttpClient returns 403', async () => {

        const { sut, httpClientStub } = makeSut()

        httpClientStub.response = {
            statusCode: HttpStatusCode.forbidden
        }

        const password = faker.internet.password()

        const formParams: SignUpParams = {
            birth_date: faker.datatype.datetime().toISOString(),
            email: faker.internet.email(),
            name: faker.random.words(),
            password,
            passwordConfirm: password,
            username: faker.internet.userName()
        }

        const promise = sut.signup(formParams)

        await expect(promise).rejects.toThrow(new EmailInUseError())

    })

    test('Should throw UnexpectedError if HttpClient returns 500', async () => {

        const { sut, httpClientStub } = makeSut()

        httpClientStub.response = {
            statusCode: HttpStatusCode.serverError
        }

        const password = faker.internet.password()

        const formParams: SignUpParams = {
            birth_date: faker.datatype.datetime().toISOString(),
            email: faker.internet.email(),
            name: faker.random.words(),
            password,
            passwordConfirm: password,
            username: faker.internet.userName()
        }

        const promise = sut.signup(formParams)

        await expect(promise).rejects.toThrow(new UnexpectedError())

    })

    test('Should throw UnexpectedError if HttpClient returns 404', async () => {

        const { sut, httpClientStub } = makeSut()

        httpClientStub.response = {
            statusCode: HttpStatusCode.notFound
        }

        const password = faker.internet.password()

        const formParams: SignUpParams = {
            birth_date: faker.datatype.datetime().toISOString(),
            email: faker.internet.email(),
            name: faker.random.words(),
            password,
            passwordConfirm: password,
            username: faker.internet.userName()
        }

        const promise = sut.signup(formParams)

        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

})
