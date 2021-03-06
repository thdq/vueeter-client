import { UserModel } from '../model/user-model'

export type AuthenticationParams = {
    username: string
    password: string
}

export interface Authentication {
    auth (params: AuthenticationParams): Promise<UserModel>
}
