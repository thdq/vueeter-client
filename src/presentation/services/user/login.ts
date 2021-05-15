import { UserModel } from "@/domain/model/user-model"
import { Authentication, AuthenticationParams } from "@/domain/usecases/authentication"
import { SaveAccessToken } from "@/domain/usecases/save-access-token"
import { makeCreateAuthentication } from "@/main/factories/components"
import { makeLocalSaveAccessToken } from "@/main/factories/usecases/local-save-access-token"
import { Store } from 'vuex'

export class LoginService implements Authentication, SaveAccessToken {
    private readonly store: Store<any>

    constructor (store: Store<any>) {
        this.store = store
    }

    async auth (form: AuthenticationParams): Promise<UserModel> {

        const makeCreateAuthenticationService = makeCreateAuthentication()

        const currentUser = await makeCreateAuthenticationService.auth(form)

        await this.store.dispatch('user/auth', currentUser)

        await this.save(currentUser.accessToken)

        return currentUser
    }

    async save (accessToken: string): Promise<void> {

        const makeLocalSaveAccessTokenService = makeLocalSaveAccessToken()

        await makeLocalSaveAccessTokenService.save(accessToken)

    }

}
