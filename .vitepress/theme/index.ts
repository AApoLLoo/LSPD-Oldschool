// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './style.css'
import LspdLogin from './components/LspdLogin.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
    app.component('LspdLogin', LspdLogin)
}
}