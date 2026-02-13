// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './style.css'
import LspdLogin from './components/LspdLogin.vue'
import MdtNavButton from './components/MdtNavButton.vue'
import LoginModal from './components/LoginModal.vue'
import MdtModal from './components/MdtModal.vue'

export default {
    extends: DefaultTheme,
    Layout() {
        return h(DefaultTheme.Layout, null, {
            'nav-bar-content-after': () => h(MdtNavButton),
            'layout-bottom': () => [h(LoginModal),
            h(MdtModal)]
        })
    },
    enhanceApp({ app }) {
    app.component('LspdLogin', LspdLogin)
}
}