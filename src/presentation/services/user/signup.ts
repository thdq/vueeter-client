import { SaveAccessToken } from "@/domain/usecases/save-access-token"
import { AddUser, SignUpParams } from "@/domain/usecases/signup"
import { makeCreateUser } from "@/main/factories/components/signup"
import { makeLocalSaveAccessToken } from "@/main/factories/usecases/local-save-access-token"
import { Store } from 'vuex'

export class SignUpService implements AddUser, SaveAccessToken {
    private readonly store: Store<any>

    constructor (store: Store<any>) {
        this.store = store
    }

    async create (form: SignUpParams): Promise<void> {

        const makeCreateUserService = makeCreateUser()

        const newUser = await makeCreateUserService.signup(form)

        await this.store.dispatch('user/auth', newUser)

        await this.save(newUser.accessToken)

    }

    async save (accessToken: string): Promise<void> {

        const makeLocalSaveAccessTokenService = makeLocalSaveAccessToken()

        await makeLocalSaveAccessTokenService.save(accessToken)
    }

}
