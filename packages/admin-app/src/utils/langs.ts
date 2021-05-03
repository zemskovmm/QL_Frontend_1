export interface Language {
    title: string
}

export const AllLanguages: { [name: string]: Language } = {
    en: {
        title: "English"
    },
    ru: {
        title: "Русский"
    },
    fr: {
        title: "Français"
    },
    esp: {
        title: "Español"
    },
    cn: {
        title: "中文"
    }
}