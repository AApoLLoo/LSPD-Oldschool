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

    socialLinks: [
      {
        // Icône SVG personnalisée (Silhouette d'officier / Badge)
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>'
        },
        link: '/Liste/login', // Lien vers la page de connexion
        ariaLabel: 'Espace Officier'
      }
    ],

    footer: {
      message: 'LSPD Oldschool - Servir et Protéger',
      copyright: 'Copyright © 2026'
    }
  }
})