import { SignUpParams } from "@/domain/usecases/signup"
import { Store } from 'vuex'

export class SignUpService {
    private readonly store: Store<any>

    constructor (store: Store<any>) {
        this.store = store
    }

    async create (form: SignUpParams): Promise<void> {

        console.log(form)

        return await Promise.resolve()

    }

}
