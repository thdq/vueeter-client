import { GetStorage } from "@/data/protocols/cache/get-storage"
import { SetStorage } from "@/data/protocols/cache/set-storage"
import { LocalStorageAdapter } from "@/infra/cache/local-sorage-adapter"

interface Storage extends SetStorage, GetStorage {}

export const makeLocalStorageAdapter = (): Storage => {
    return new LocalStorageAdapter()
}
