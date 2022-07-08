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

    GET doctors/ - Доктора (поддержка пагинации, поиска)
    GET services/ - Сервисы (поддержка пагинации, поиска)

    POST add-doctor/ - Добавление доктора, name/position/bio - string, также было фото но из-за проблем с бэком пришлось убрать

    По ссылкам можно перейти и посмотреть результат (тк это джанга он отображен в нормальном виде со стилями и настройками)
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
        return this.$axios.$post('add-doctor/', data)
    }
}