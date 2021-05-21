import { UserModel } from "@/domain/model/user-model"
import { makeLocalStorageAdapter } from "@/main/factories/cache/local-storage-adapter"

interface UserState {
    currentUser: UserModel,
}

export const state = (): UserState => ({
    currentUser: {
        accessToken: ""
    }
})

export const mutations = {
    setCurrentUser (state, data) {
        state.currentUser = data
    }
}

export const actions = {
    async auth ({ commit }, user: UserModel) {

        if (!user) {

            const localStorageAdapter = makeLocalStorageAdapter()

            const accessToken = await localStorageAdapter.get('accessToken')

            user = {
                accessToken
            }
        }

        commit('setCurrentUser', user)

    }
}

export const getters = {
    isAuthenticated: (state): boolean => {

        const { currentUser } = state as UserState

        const isAuth: boolean = currentUser.accessToken != null && currentUser.accessToken !== ""

        return isAuth
    }
}
