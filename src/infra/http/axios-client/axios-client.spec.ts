import { HttpRequest } from '@/data/protocols/http/http-client'
import axios from 'axios'
import faker from 'faker'
import { AxiosClient } from './axios-client'

jest.mock('axios')

type mockResultAxios = {
    data: string,
    status: number
}
interface SutTypes {
    sut: AxiosClient,
    mockedAxios: jest.Mocked<typeof axios>,
    mockResultAxios: mockResultAxios,
    requestStub: HttpRequest
}

const makePostRequest = (): HttpRequest => ({
    method: "post",
    url: faker.internet.url(),
    body: faker.random.objectElement()
})

const makeSut = (): SutTypes => {

    const mockedAxios = axios as jest.Mocked<typeof axios>

    const mockResultAxios: mockResultAxios = {
        data: faker.random.objectElement(),
        status: faker.datatype.number()
    }

    mockedAxios.request.mockClear().mockResolvedValue(mockResultAxios)

    const requestStub = makePostRequest()
    const sut = new AxiosClient()

    return {
        sut,
        mockedAxios,
        mockResultAxios,
        requestStub
    }

}

describe('AxiosClient', () => {

    test('Should call axios with correct values', () => {

        const { sut, mockedAxios, requestStub } = makeSut()

        sut.request(requestStub)

        expect(mockedAxios.request).toHaveBeenCalledWith({
            url: requestStub.url,
            data: requestStub.body,
            headers: requestStub.headers,
            method: requestStub.method
        })

    })

    test('Should return correct response', async () => {

        const { sut, mockedAxios, requestStub } = makeSut()

        const httpResponse = await sut.request(requestStub)

        const axiosResponse = await mockedAxios.request.mock.results[0].value

        expect(httpResponse).toEqual({
            statusCode: axiosResponse.status,
            body: axiosResponse.data
        })

    })

    test('Should return correct error', () => {

        const { sut, mockedAxios, requestStub } = makeSut()

        mockedAxios.request.mockRejectedValueOnce({
            response: requestStub
        })

        const promise = sut.request(requestStub)

        expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
    })
})
