import { HttpPostParams } from '@/data/protocols/http/http-params'
import axios from 'axios'
import faker from 'faker'
import { AxiosClient } from './axios-client'

jest.mock('axios')

interface SutTypes {
    sut: AxiosClient,
    mockedAxios: jest.Mocked<typeof axios>,
    requestStub: HttpPostParams<any>
}

const makePostRequest = (): HttpPostParams<any> => ({
    url: faker.internet.url(),
    body: faker.random.objectElement()
})

const makeSut = (): SutTypes => {

    const mockedAxios = axios as jest.Mocked<typeof axios>
    const requestStub = makePostRequest()
    const sut = new AxiosClient()

    return {
        sut,
        mockedAxios,
        requestStub
    }

}

describe('AxiosClient', () => {

    test('Should call axios with correct values', () => {

        const { sut, mockedAxios, requestStub } = makeSut()

        sut.post(requestStub)

        expect(mockedAxios.post).toHaveBeenCalledWith(requestStub.url, requestStub.body)

    })

})
