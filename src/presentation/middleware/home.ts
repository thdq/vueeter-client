import { Context } from '@nuxt/types'
import { MiddlewareProtocol } from './protocols/middleware'

class HomeMiddleware implements MiddlewareProtocol {
    private readonly context: Context

    constructor (context: Context) {
        this.context = context
    }

    handle (): void {

        const authenticated = this.isAuthenticated()

        if (!authenticated) this.redirectTo('/')

    }

    isAuthenticated (): boolean {

        const { store } = this.context

        return store.getters['user/isAuthenticated'] || false
    }

    redirectTo (path: string): string {

        const { redirect } = this.context

        redirect(path)

        return path
    }

}

export default (context: Context) => new HomeMiddleware(context).handle()
export { HomeMiddleware }
