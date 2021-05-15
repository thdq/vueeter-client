import { UserModel } from "@/domain/model/user-model"

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
    auth ({ commit }, user: UserModel) {

        if (!user) {

            const accessToken = localStorage.getItem('accessToken')

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
