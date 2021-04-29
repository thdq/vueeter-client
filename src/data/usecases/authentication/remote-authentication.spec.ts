import faker from 'faker'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials'
import { UnexpectedError } from '@/domain/errors/unexpected'
import { UserModel } from '@/domain/model/user-model'
import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode, HttpMethod } from '@/data/protocols/http/http-client'
import { Validation } from '@/presentation/protocols/validation'
import { MissingParamsError } from '@/presentation/errors'
import { RemoteAuthentication } from "./remote-authentication"

interface SutType {
    sut: RemoteAuthentication
    httpClientStub: HttpClient<UserModel>
    validationStub: Validation
}

const makeValidation = (): Validation => {
    class ValidationStub {
        validate (input: any): Error {
            return null
        }
    }

    return new ValidationStub()
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

const makeSut = (url: string = faker.internet.url()): SutType => {

    const httpClientStub = makeHttpClient()
    const validationStub = makeValidation()
    const sut = new RemoteAuthentication(url, httpClientStub, validationStub)

    return {
        sut,
        httpClientStub,
        validationStub
    }
}

describe('RemoteAuthentication', () => {

    test('Should call HttpClient with correct URL', async () => {

        const url = '_other_url'

        const { sut, httpClientStub } = makeSut(url)

        const authParams: AuthenticationParams = {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        await sut.auth(authParams)

        expect(httpClientStub.url).toBe(url)

    })

    test('Should call HttpClient with correct body', async () => {

        const { sut, httpClientStub } = makeSut()

        const authParams: AuthenticationParams = {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        await sut.auth(authParams)

        expect(httpClientStub.body).toEqual(authParams)

    })

    test('Should call Validation with correct values', async () => {

        const { sut, validationStub } = makeSut()

        const validationSpy = jest.spyOn(validationStub, 'validate')

        const authParams: AuthenticationParams = {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        await sut.auth(authParams)

        expect(validationSpy).toHaveBeenCalledWith(authParams)

    })

    test('Should throws if Validation fails', async () => {

        const { sut, validationStub } = makeSut()

        jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => new MissingParamsError("password"))

        const authParams: AuthenticationParams = {
            username: faker.internet.userName(),
            password: ""
        }

        const promise = sut.auth(authParams)

        await expect(promise).rejects.toThrow(new MissingParamsError("password"))

    })

    test('Should throw if HttpClient returns 401 on InvalidCredentialsError', async () => {

        const { sut, httpClientStub } = makeSut()

        httpClientStub.response = {
            statusCode: HttpStatusCode.unauthorized
        }

        const authParams: AuthenticationParams = {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        const promise = sut.auth(authParams)

        await expect(promise).rejects.toThrow(new InvalidCredentialsError())

    })

    test('Should throw if HttpClient returns 400 on UnexpectedError', async () => {

        const { sut, httpClientStub } = makeSut()

        httpClientStub.response = {
            statusCode: HttpStatusCode.badRequest
        }

        const authParams: AuthenticationParams = {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        const promise = sut.auth(authParams)

        await expect(promise).rejects.toThrow(new UnexpectedError())

    })

    test('Should throw if HttpClient returns 404 on UnexpectedError', async () => {

        const { sut, httpClientStub } = makeSut()

        httpClientStub.response = {
            statusCode: HttpStatusCode.notFound
        }

        const authParams: AuthenticationParams = {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        const promise = sut.auth(authParams)

        await expect(promise).rejects.toThrow(new UnexpectedError())

    })

    test('Should throw if HttpClient returns 500 on UnexpectedError', async () => {

        const { sut, httpClientStub } = makeSut()

        httpClientStub.response = {
            statusCode: HttpStatusCode.serverError
        }

        const authParams: AuthenticationParams = {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        const promise = sut.auth(authParams)

        await expect(promise).rejects.toThrow(new UnexpectedError())

    })

    test('Should return an UserModel if HttpClient returns 200', async () => {

        const { sut, httpClientStub } = makeSut()

        const httpResult = {
            accessToken: faker.datatype.uuid()
        }

        httpClientStub.response = {
            statusCode: HttpStatusCode.success,
            body: httpResult
        }

        const authParams: AuthenticationParams = {
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        const user = await sut.auth(authParams)

        expect(user).toEqual(httpResult)

    })

})
