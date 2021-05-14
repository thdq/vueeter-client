export class EmailInUseError extends Error {
    constructor () {
        super('domain.errors.invalid.email_in_use')
        this.name = 'EmailInUseError'
    }
}
