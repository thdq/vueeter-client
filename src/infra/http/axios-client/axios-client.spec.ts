import { HttpPostParams } from '@/data/protocols/http/http-params'
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
    requestStub: HttpPostParams<any>
}

const makePostRequest = (): HttpPostParams<any> => ({
    url: faker.internet.url(),
    body: faker.random.objectElement()
})

const makeSut = (): SutTypes => {

    const mockedAxios = axios as jest.Mocked<typeof axios>

    const mockResultAxios: mockResultAxios = {
        data: faker.random.objectElement(),
        status: faker.datatype.number()
    }

    mockedAxios.post.mockResolvedValue(mockResultAxios)

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

        sut.post(requestStub)

        expect(mockedAxios.post).toHaveBeenCalledWith(requestStub.url, requestStub.body)

    })

    test('Should return the correct statusCode and body', async () => {

        const { sut, requestStub, mockResultAxios } = makeSut()

        const response = await sut.post(requestStub)

        expect(response).toEqual({
            statusCode: mockResultAxios.status,
            body: mockResultAxios.data
        })

    })

})
