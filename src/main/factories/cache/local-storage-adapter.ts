import { SetStorage } from "@/data/protocols/cache/set-storage"
import { LocalStorageAdapter } from "@/infra/cache/local-sorage-adapter"

export const makeLocalStorageAdapter = (): SetStorage => {
    return new LocalStorageAdapter()
}
