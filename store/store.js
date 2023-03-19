import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        countries: [],
        countryDetails: {},
        isDarkTheme: false
    },
    mutations: {
        'set_countries' (state, countries) {
            state.countries = countries
        },
        'set_country_details' (state, country) {
            state.countryDetails = country
        },
        'switch_dark_theme' (state) {
            state.isDarkTheme = state.isDarkTheme ? false : true
        }
    },
    actions: {
        initApp: ({commit}) => {
            axios.get('https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,subregion,languages,tld,borders,nativeName,currencies,demonym,cca3')
            .then((response) => {
                commit('set_countries', response.data)
            })
        },
        fetchCountryDetails: ({commit}, countryName) => {
            axios.get(`https://restcountries.com/v3.1/name/${countryName}?fields=name,flags,region,population,capital,subregion,languages,tld,borders,nativeName,currencies,demonym,cca3`)
            .then((response) => {
                commit('set_country_details', response.data[0])
            })
        }
    },
    getters: {
        countries: state => state.countries,
        countryDetails: state => state.countryDetails,
        isDarkTheme: state => state.isDarkTheme
    }
})