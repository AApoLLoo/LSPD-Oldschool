import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "LSPD OldSchool",
  description: "Documentation officielle LSPD",
  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=VT323&display=swap' }]
  ],
  themeConfig: {
    logo: '/public/LSPD.webp',
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

    //socialLinks: [
     // {
    //],

    footer: {
      message: 'LSPD Oldschool - Servir et Protéger',
      copyright: 'Copyright © 2026'
    }
  }
})