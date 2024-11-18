import { useLanguage } from "../contexts/LanguageContext";
import textPL from "../assets/texts/pl.json";
import textEN from "../assets/texts/en.json";
import { useEffect, useState } from "react";

interface Page {
    meta: {
        title: string,
        description: string
    }
}

interface Text {
    nav: {
        name: string,
        link: string
    }[]
    ,
    home: Page & {
        meta: {
            title: string,
            description: string
        }
        banner: {
            title: string,
            text: string
        },
        about: {
            title: string,
            text: string
            button: string
        },
        structure: {
            title: string,
            description: string,
            teams: {
                title: string,
                description: string
            }[]
        },
        joinUs: {
            text: string
        }
    },
    projects: Page & {},
    about: Page & {},
    bottomBar: {
        socials: string,
        copyrights: string
    }
}

function textSelector() {
    const [text, setText] = useState<Text>(textPL);
    const { language } = useLanguage();
    useEffect(() => {
        switch (language) {
            case "en":
                setText(textEN);
                break;
            default:
                setText(textPL);
                break;
        }
    }, [language])

    return text;
}

export default textSelector;