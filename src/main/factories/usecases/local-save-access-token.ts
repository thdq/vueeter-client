import { LocalSaveAccessToken } from "@/data/usecases/save-access-token/local-save-access-token"
import { SaveAccessToken } from "@/domain/usecases/save-access-token"
import { makeLocalStorageAdapter } from "../cache/local-storage-adapter"

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
    return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
