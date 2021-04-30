import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { makeLoginValidation } from '@/main/factories/validation/login'

export const makeCreateAuthentication = (): RemoteAuthentication => {
    return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient(), makeLoginValidation())
}
