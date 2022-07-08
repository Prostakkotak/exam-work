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

    async getDoctors({commit}, q = null) {
        const data = await this.$axios.$get(`doctors/?search=${q ? q : ""}&format=json`)

        commit("SET_DOCTORS", data.results)
    },
    async getServices({commit}, q = null) {
        const data = await this.$axios.$get(`services/?search=${q ? q : ""}&format=json`)

        commit("SET_SERVICES", data.results)
    },

    addSalesItem(_, data) {   
      return this.$axios.$post("/api/delivery/sales", data)
    }
}