import { SignUpParams } from "@/domain/usecases/signup"
import { makeCreateUser } from "@/main/factories/components/signup"
import { Store } from 'vuex'

export class SignUpService {
    private readonly store: Store<any>

    constructor (store: Store<any>) {
        this.store = store
    }

    async create (form: SignUpParams): Promise<void> {

        const makeCreateUserService = makeCreateUser()

        const newUser = await makeCreateUserService.signup(form)

        await this.store.dispatch('user/auth', newUser)

    }

}
