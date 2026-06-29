import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      "hero": {
        "tagline": "Awwwards Level Engineer",
        "greeting": "John Doe"
      },
      "about": {
        "title": "About Me"
      }
    }
  },
  es: {
    translation: {
      "hero": {
        "tagline": "Ingeniero de Nivel Awwwards",
        "greeting": "John Doe"
      },
      "about": {
        "title": "Sobre mí"
      }
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
