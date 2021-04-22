export type LoginParams = {
    username: string
    password: string
}

export class LoginComponent {
    private readonly params: LoginParams

    constructor (params: LoginParams) {
        this.params = params

    }

    async auth (): Promise<void> {

        await null
    }
}
