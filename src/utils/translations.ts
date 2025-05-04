
export const translations = {
  en: {
    nav: {
      home: "Home",
      risk: "Risk Assessment",
      nutrition: "Nutrition",
      schemes: "Schemes",
      resources: "Resources",
      community: "Community",
      support: "Support",
      chat: "Chat",
      about: "About",
      login: "Login",
      profile: "Profile"
    },
    common: {
      darkMode: "Dark Mode",
      language: "Language",
      share: "Share",
      addToCalendar: "Add to Calendar",
      downloadApp: "Use Offline",
      findSchemes: "Find Matching Schemes",
      next: "Next",
      back: "Back",
      submit: "Submit",
      loading: "Loading..."
    }
  },
  es: {
    nav: {
      home: "Inicio",
      risk: "Evaluación de Riesgo",
      nutrition: "Nutrición",
      schemes: "Esquemas",
      resources: "Recursos",
      community: "Comunidad",
      support: "Soporte",
      chat: "Chat",
      about: "Acerca de",
      login: "Iniciar Sesión",
      profile: "Perfil"
    },
    common: {
      darkMode: "Modo Oscuro",
      language: "Idioma",
      share: "Compartir",
      addToCalendar: "Añadir al Calendario",
      downloadApp: "Usar sin Conexión",
      findSchemes: "Encontrar Esquemas Compatibles",
      next: "Siguiente",
      back: "Atrás",
      submit: "Enviar",
      loading: "Cargando..."
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      risk: "Évaluation des Risques",
      nutrition: "Nutrition",
      schemes: "Programmes",
      resources: "Ressources",
      community: "Communauté",
      support: "Support",
      chat: "Chat",
      about: "À Propos",
      login: "Connexion",
      profile: "Profil"
    },
    common: {
      darkMode: "Mode Sombre",
      language: "Langue",
      share: "Partager",
      addToCalendar: "Ajouter au Calendrier",
      downloadApp: "Utiliser Hors Ligne",
      findSchemes: "Trouver des Programmes Correspondants",
      next: "Suivant",
      back: "Retour",
      submit: "Soumettre",
      loading: "Chargement..."
    }
  },
  hi: {
    nav: {
      home: "होम",
      risk: "जोखिम आकलन",
      nutrition: "पोषण",
      schemes: "योजनाएं",
      resources: "संसाधन",
      community: "समुदाय",
      support: "सहायता",
      chat: "चैट",
      about: "हमारे बारे में",
      login: "लॉगिन",
      profile: "प्रोफाइल"
    },
    common: {
      darkMode: "डार्क मोड",
      language: "भाषा",
      share: "शेयर करें",
      addToCalendar: "कैलेंडर में जोड़ें",
      downloadApp: "ऑफ़लाइन उपयोग करें",
      findSchemes: "मिलती-जुलती योजनाएं खोजें",
      next: "आगे",
      back: "पीछे",
      submit: "जमा करें",
      loading: "लोड हो रहा है..."
    }
  }
};

export type TranslationKeys = keyof typeof translations.en;
export type Language = keyof typeof translations;

export function getText(key: string, language: Language = 'en'): string {
  const keys = key.split('.');
  let text: any = translations[language];
  
  for (const k of keys) {
    if (text && text[k]) {
      text = text[k];
    } else {
      return key;
    }
  }
  
  return text || key;
}
