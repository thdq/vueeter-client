export class UnexpectedError extends Error {
    constructor (body?: any) {

        const messageError = body?.message || 'domain.errors.invalid.unexpected'

        super(messageError)
        this.name = 'UnexpectedError'
    }
}
