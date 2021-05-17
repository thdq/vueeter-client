export class UnexpectedError extends Error {
    constructor (body?: any) {

        const messageError = body?.message || 'domain.errors.invalid.unexpected'

        console.log(body)

        super(messageError)
        this.name = 'UnexpectedError'
    }
}
