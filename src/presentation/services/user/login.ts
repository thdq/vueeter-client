import { AuthenticationParams } from "@/domain/usecases/authentication"
import { makeCreateAuthentication } from "@/main/factories/components"
import { Store } from 'vuex'

export class LoginService {
    private readonly store: Store<any>

    constructor (store: Store<any>) {
        this.store = store
    }

    async auth (form: AuthenticationParams): Promise<void> {

        const makeCreateAuthenticationService = makeCreateAuthentication()

        const currentUser = await makeCreateAuthenticationService.auth(form)

        await this.store.dispatch('user/auth', currentUser)
    }

}
