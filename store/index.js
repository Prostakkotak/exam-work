export const state = () => ({
    doctors: [],
    services: []
})
export const mutations = {
    SET_DOCTORS(state, payload) {
        state.doctors = payload
    },
    SET_SERVICES(state, payload) {
        state.services = payload
    }
}
export const getters = {}

/* 
    Базовый url: http://vet-two.std-1388.ist.mospolytech.ru/api/

    GET doctors - Доктора
    GET services - Сервисы

 */

export const actions = {

    async getDoctors({commit}, page = 0) {
        const data = await this.$axios.$get(`doctors/?format=json&limit=10&offset=${page !== 0 ? page * 10 : 0}`)

        commit("SET_DOCTORS", data)

        return true
    },
    async getServices({commit}, page = 0) {
        const data = await this.$axios.$get(`services/?format=json&limit=10&offset=${page !== 0 ? page * 10 : 0}`)

        commit("SET_SERVICES", data)

        return true
    },

    addDoctor(_,data) {
        return this.$axios.$post('add-doctor', data)
    }
}