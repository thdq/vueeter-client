import { UserModel } from '../model/user-model'

export type SignUpParams = {
    name: string,
    email: string,
    birth_date: string,
    password: string,
    passwordConfirm: string,
    username: string
}

export interface Authentication {
    signup (params: SignUpParams): Promise<UserModel>
}
