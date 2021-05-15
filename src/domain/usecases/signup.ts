export type SignUpParams = {
    name: string,
    email: string,
    birth_date: string,
    password: string,
    passwordConfirm: string,
    username: string
}

export interface AddUser {
    create (form: SignUpParams): Promise<void>
}
