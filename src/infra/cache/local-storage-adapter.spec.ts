import faker from 'faker'
import { LocalStorageAdapter } from "./local-sorage-adapter"
import 'jest-localstorage-mock'

interface SutTypes {
    sut: LocalStorageAdapter
}

const makeSut = (): SutTypes => {

    const sut = new LocalStorageAdapter()

    return {
        sut
    }

}

describe('LocalStorageAdapter', () => {

    beforeEach(() => {
        localStorage.clear()
    })

    test('Should call localStorage with correct values', async () => {

        const { sut } = makeSut()

        const key = faker.database.column()
        const value = faker.random.word()

        await sut.set(key, value)

        expect(localStorage.setItem).toHaveBeenCalledWith(key, value)

    })

})
