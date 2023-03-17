import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        countries: {}
    },
    mutations: {
        'set_store' (state, countries) {
            state.countries = countries
        }
    },
    actions: {
        initApp: ({commit}) => {
            axios.get('https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,subregion,languages,topLevelDomain,borders,nativeName,currencies')
            .then((response) => {
                commit('set_store', response.data)
            })
        }
    },
    getters: {
        countries: state => state.countries
    }
})