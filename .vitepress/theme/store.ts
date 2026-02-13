import { reactive } from 'vue'

// État global (privé)
const state = reactive({
    user: null,
    isLoginOpen: false,
    isMdtOpen: false // NOUVEAU : Gère l'affichage du MDT
})

// Export public
export const store = {
    // Getters
    get user() { return state.user },
    get isLoginOpen() { return state.isLoginOpen },
    get isMdtOpen() { return state.isMdtOpen },

    // Setters
    set isLoginOpen(val) { state.isLoginOpen = val },
    set isMdtOpen(val) { state.isMdtOpen = val },

    init() {
        if (typeof localStorage !== 'undefined') {
            const saved = localStorage.getItem('mdt_user')
            if (saved) {
                state.user = JSON.parse(saved)
            }
        }
    },

    login(userData: any) {
        state.user = userData
        state.isLoginOpen = false // Ferme le login
        state.isMdtOpen = true    // Ouvre le MDT direct
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('mdt_user', JSON.stringify(userData))
        }
    },

    logout() {
        state.user = null
        state.isMdtOpen = false // Ferme le MDT
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('mdt_user')
            localStorage.removeItem('mdt_last_tab')
        }
    }
}