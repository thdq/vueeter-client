import { AuthenticationParams } from "@/domain/usecases/authentication"

export * from "@/domain/usecases/authentication"
export interface LoginAPIResponse {
    waiting: boolean,
    error: boolean,
    messageError: string
}

export interface ComponentData {
    apiResponse: LoginAPIResponse,
    form: AuthenticationParams

}
