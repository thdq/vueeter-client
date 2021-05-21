import { SetStorage } from "@/data/protocols/cache/set-storage"
import { GetStorage } from "@/data/protocols/cache/get-storage"

export class LocalStorageAdapter implements SetStorage, GetStorage {
    key: string
    value: any

    async set (key: string, value: any): Promise<void> {

        await localStorage.setItem(key, value)

    }

    async get (key: string): Promise<any> {

        return await localStorage.getItem(key)

    }
}
