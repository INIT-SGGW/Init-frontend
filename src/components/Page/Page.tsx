import { useLanguage } from '../../contexts/LanguageContext';
import './Page.css'
import React, { useEffect } from 'react'

interface PageProps {
    children: React.ReactNode;
    pageTitle: string;
    description: string;
    paddingTop?: boolean;
    noIndex?: boolean;
    paddingBottom?: boolean;
}

// Comonent for setting meta tags for the page
function Page({ children, pageTitle, description, paddingTop = true, noIndex = false, paddingBottom = true }: PageProps) {
    const [topPadding, setTopPadding] = React.useState(0);
    const { language } = useLanguage();

    useEffect(() => {
        const navElement = document.querySelector('#topbar') as HTMLElement;
        setTopPadding(navElement.offsetHeight);
    }, [])

    useEffect(() => {
        // Setting page title
        document.title = pageTitle;

        // Setting meta description
        const metaDescription: HTMLMetaElement | null = document.querySelector('meta[name="description"]');

        if (metaDescription) {
            // check if the description is already set
            metaDescription.setAttribute('content', description);
            if (language) {
                metaDescription.lang = language;
            }
        } else {
            // create new meta description
            const metaDescription = document.createElement('meta');
            if (language) {
                metaDescription.lang = language;
            }
            metaDescription.name = 'description';
            metaDescription.content = description;
            document.head.appendChild(metaDescription);
        }

        // Setting noindex
        const metaRobots = document.querySelector('meta[name="robots"][content="noindex"]');
        if (metaRobots) {
            // check if the noindex is already set
            if (noIndex) {
                metaRobots.setAttribute('content', 'noindex');
            } else {
                metaRobots.remove();
            }
        } else {
            // create new meta noindex
            if (noIndex) {
                const metaRobots = document.createElement('meta');
                metaRobots.name = 'robots';
                metaRobots.content = 'noindex';
                document.head.appendChild(metaRobots);
            }
        }
    }, [description, noIndex, pageTitle, language])

    return (
        <div
            className={`${paddingBottom ? ' page-container--padding-bottom' : ""}`}
            style={{ paddingTop: `${paddingTop ? topPadding : 0}px` }}
        >
            {children}
        </div>
    )
}

export default Page