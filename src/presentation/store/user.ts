import { UserModel } from "@/domain/model/user-model"

export const state = () => ({
    currentUser: {}
})

export const mutations = {
    setCurrentUser (state, data) {
        state.currentUser = data
    }
}

export const actions = {
    auth ({ commit }, user: UserModel) {

        commit('setCurrentUser', user)

    }
}
