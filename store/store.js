import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        countries: [],
        countryDetails: {}
    },
    mutations: {
        'set_countries' (state, countries) {
            state.countries = countries
        },
        'set_country_details' (state, country) {
            state.countryDetails = country
        }
    },
    actions: {
        initApp: ({commit}) => {
            axios.get('https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,subregion,languages,topLevelDomain,borders,nativeName,currencies,demonym')
            .then((response) => {
                commit('set_countries', response.data)
            })
        },
        fetchCountryDetails: ({commit}, countryName) => {
            axios.get(`https://restcountries.com/v3.1/name/${countryName}?fields=name,flags,region,population,capital,subregion,languages,topLevelDomain,borders,nativeName,currencies,demonym`)
            .then((response) => {
                commit('set_country_details', response.data[0])
            })
        }
    },
    getters: {
        countries: state => state.countries,
        countryDetails: state => state.countryDetails
    }
})