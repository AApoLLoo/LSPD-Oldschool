import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "LSPD OldSchool",
  description: "Documentation officielle LSPD",
  themeConfig: {
    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Procédures', link: '/Liste/arrestation' },
      { text: 'SOP', link: '/Liste/sop' }
    ],

    sidebar: [
      {
        text: 'Procédures',
        items: [
          { text: '👮‍♂️ Arrestation & Miranda', link: '/Liste/arrestation' },
          { text: '⚖️ Procédures Judiciaires', link: '/Liste/proces' },
          { text: '📩 Contact DOJ', link: '/Liste/contact-doj' },
        ]
      },
      {
        text: 'Manuel',
        items: [
          { text: '📘 S.O.P (Standards)', link: '/Liste/sop' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AApoLLoo/LSPD-OldSchool' }
    ],

    footer: {
      message: 'LSPD Oldschool - Servir et Protéger',
      copyright: 'Copyright © 2026'
    }
  }
})