export const state = () => ({
    pagesData: {},
    sales: [],
    fields: null
})
export const mutations = {
    ADD_PAGES_DATA(state, payload) {
        state.pagesData = {...state.pagesData, ...payload}
    },
    SET_SALES(state, payload) {
        state.sales = payload
    },
    SET_FIELDS(state, payload) {
        state.fields = payload
    }
}
export const getters = {}

/* 
    Базовый url: https://demo-api.vsdev.space	

	GET /api/delivery/left_widget - контент левого виджета
	GET /api/delivery/home_page - контент главной страницы
	GET /api/delivery/about_page - контент страницы "О нас"

	GET /api/delivery/sales - список доставок *
	GET /api/delivery/sales/form - список полей формы добавления *
	POST /api/delivery/sales - добавление доставки *
 */

export const actions = {
    async getDefaultPagesData({commit}) {
        const home = await this.$axios.$get("/api/delivery/home_page")
        const about = await this.$axios.$get("/api/delivery/about_page")
        const leftWidget = await this.$axios.$get("/api/delivery/left_widget")

        commit("ADD_PAGES_DATA", {
            home,
            about,
            leftWidget
        })
    },
    async getSales({commit}) {
        const sales = await this.$axios.$get("/api/delivery/sales")

        commit("SET_SALES", sales)
    },

    async getFields({commit}) {
        const data = await this.$axios.$get("/api/delivery/sales/form")

        commit("SET_FIELDS", data.fields)
    },

    addSalesItem(_, data) {   
      return this.$axios.$post("/api/delivery/sales", data)
    }
}