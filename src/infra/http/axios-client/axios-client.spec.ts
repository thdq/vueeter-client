import axios from 'axios'
import faker from 'faker'
import { AxiosClient } from './axios-client'

jest.mock('axios')

interface SutTypes {
    sut: AxiosClient,
    mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {

    const sut = new AxiosClient()
    const mockedAxios = axios as jest.Mocked<typeof axios>

    return {
        sut,
        mockedAxios
    }

}

describe('AxiosClient', () => {

    test('Should call axios with correct URL', () => {

        const { sut, mockedAxios } = makeSut()

        const URL = faker.internet.url()

        sut.post({
            url: URL
        })

        expect(mockedAxios).toHaveBeenCalledWith(URL)

    })

})
