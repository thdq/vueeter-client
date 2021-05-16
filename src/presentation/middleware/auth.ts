import { Context } from '@nuxt/types'
import { MiddlewareProtocol } from './protocols/middleware'

class AuthMiddleware implements MiddlewareProtocol {
    private readonly context: Context

    constructor (context: Context) {
        this.context = context
    }

    handle (): void {

        const authenticated = this.isAuthenticated()

        if (authenticated) this.redirectTo('/home')

    }

    isAuthenticated (): boolean {

        const { store } = this.context

        if (!store.getters['user/isAuthenticated']) {

            store.dispatch('user/auth', null)

        }

        return store.getters['user/isAuthenticated'] || false
    }

    redirectTo (path: string): string {

        const { redirect } = this.context

        redirect(path)

        return path
    }

}

export default (context: Context) => new AuthMiddleware(context).handle()
export { AuthMiddleware }
