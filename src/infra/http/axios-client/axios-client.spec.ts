import { HttpPostParams } from '@/data/protocols/http/http-params'
import axios from 'axios'
import faker from 'faker'
import { AxiosClient } from './axios-client'

jest.mock('axios')

interface SutTypes {
    sut: AxiosClient,
    mockedAxios: jest.Mocked<typeof axios>
}

const makePostRequest = (): HttpPostParams<any> => ({
    url: faker.internet.url(),
    body: faker.random.objectElement()
})

const makeSut = (): SutTypes => {

    const sut = new AxiosClient()
    const mockedAxios = axios as jest.Mocked<typeof axios>

    return {
        sut,
        mockedAxios
    }

}

describe('AxiosClient', () => {

    test('Should call axios with correct URL and verb', () => {

        const { sut, mockedAxios } = makeSut()

        const request = makePostRequest()

        sut.post(request)

        expect(mockedAxios.post).toHaveBeenCalledWith(URL)

    })

})
