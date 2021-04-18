export class UnexpectedError extends Error {
    constructor () {
        super('domain.errors.invalid.unexpected')
        this.name = 'UnexpectedError'
    }
}
