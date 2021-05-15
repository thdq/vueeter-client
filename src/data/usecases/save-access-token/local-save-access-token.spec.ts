import { SetStorage } from '@/data/protocols/cache/set-storage'
import faker from 'faker'
import { LocalSaveAccessToken } from './local-save-access-token'

interface SutTypes {
    sut: LocalSaveAccessToken
    setStorageStub: SetStorage
}

const makeSetStorage = (): SetStorage => {

    class SetStorageStub implements SetStorage {
        key: string
        value: any

        async set (key: string, value: string): Promise<void> {
            this.key = key
            this.value = value
            await Promise.resolve()
        }
    }

    return new SetStorageStub()
}

const makeSut = (): SutTypes => {

    const setStorageStub = makeSetStorage()
    const sut = new LocalSaveAccessToken(setStorageStub)

    return {
        sut,
        setStorageStub
    }

}

describe('LocalSaveAccessToken', () => {

    test('Should call SetStorage with correct value', async () => {

        const { sut, setStorageStub } = makeSut()

        const accessToken = faker.datatype.uuid()

        await sut.save(accessToken)

        expect(setStorageStub.key).toBe('accessToken')
        expect(setStorageStub.value).toBe(accessToken)

    })

    test('Should throw if SetStorage throws', async () => {

        const { sut, setStorageStub } = makeSut()

        jest.spyOn(setStorageStub, 'set').mockRejectedValueOnce(new Error("Custom error"))

        const promise = sut.save(faker.datatype.uuid())

        await expect(promise).rejects.toThrow()

    })

})
