import { RemoteAddUser } from '@/data/usecases/add-user/remote-add-user'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'

export const makeCreateUser = (): RemoteAddUser => {
    return new RemoteAddUser(makeApiUrl('/signup'), makeAxiosHttpClient())
}
