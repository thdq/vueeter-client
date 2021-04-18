export class InvalidCredentialsError extends Error {
    constructor () {
        super('domain.errors.invalid.credentials')
        this.name = 'InvalidCredentialsError'
    }
}
