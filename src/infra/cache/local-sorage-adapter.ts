import { SetStorage } from "@/data/protocols/cache/set-storage"

export class LocalStorageAdapter implements SetStorage {
    key: string
    value: any

    async set (key: string, value: any): Promise<void> {

        await localStorage.setItem(key, value)

    }
}
