import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const apiUrl = 'https://countries.dev'

function normalizeCountry (country) {
    return {
        name: {
            common: country.name,
            nativeName: country.nativeName ? {native: {official: country.nativeName}} : null
        },
        cca3: country.alpha3Code,
        flags: country.flags || {},
        region: country.region,
        subregion: country.subregion,
        population: country.population,
        capital: country.capital ? [country.capital] : [],
        tld: country.topLevelDomain || [],
        currencies: Array.isArray(country.currencies) ? country.currencies : [],
        languages: Array.isArray(country.languages) ? country.languages.map(language => language.name) : [],
        borders: country.borders || []
    }
}

export default new Vuex.Store({
    state: {
        countries: [],
        isDarkTheme: false
    },
    mutations: {
        'set_countries' (state, countries) {
            state.countries = countries
        },
        'switch_dark_theme' (state) {
            state.isDarkTheme = state.isDarkTheme ? false : true
        }
    },
    actions: {
        initApp: ({commit, state}) => {
            if (state.countries.length) return Promise.resolve()
            return axios.get(`${apiUrl}/countries?fields=name,flags,region,population,capital,alpha3Code`)
            .then((response) => {
                commit('set_countries', response.data.map(normalizeCountry))
            })
        },
        fetchCountryDetails: (context, countryName) => {
            return axios.get(`${apiUrl}/name/${encodeURIComponent(countryName)}`)
            .then(response => {
                const country = response.data.find(item => item.name && item.name.toLowerCase() === countryName.toLowerCase())
                if (!country) throw new Error('Country not found')
                return normalizeCountry(country)
            })
        }
    },
    getters: {
        countries: state => state.countries,
        isDarkTheme: state => state.isDarkTheme
    }
})
