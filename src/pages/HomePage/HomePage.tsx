import Section from '../../components/Section/Section'
import './HomePage.css'
import HomeBgImage from '../../assets/home-bg.svg'
import HomeBgMobileImage from "../../assets/home-bg-mobile.svg";
import { useEffect, useState } from 'react';
import useIsMobile from '../../hooks/useIsMobile';
import StripesImage from "../../assets/yellow-stripes.svg";
import StripesMobileImage from "../../assets/yellow-stripes-mobile.svg";
import TextWithArrow from '../../components/TextWithArrow/TextWithArrow';
import textSelector from '../../utils/textSelector';
import { useWindowWidth } from '../../hooks';
import DiscordIcon from '../../assets/discord-icon.svg';
import Page from '../../components/Page/Page';

function HomePage() {
    const pageText = textSelector().home;
    const [topPadding, setTopPadding] = useState(0);
    const isMobile = useIsMobile();
    const windowWidth = useWindowWidth();

    useEffect(() => {
        const navElement = document.querySelector('#topbar') as HTMLElement;
        setTopPadding(navElement.offsetHeight);
    }, [])

    return (
        <Page pageTitle={pageText.meta.title} description={pageText.meta.description} paddingTop={false} paddingBottom={false}>
            <div className='home'>
                <Section className='home__banner' relative paddingTop={`${topPadding}px`} alignItems='flex-start' overflow='hidden'>
                    <img className='home__banner_bg' src={isMobile ? HomeBgMobileImage : HomeBgImage} alt="BG image" />
                    <div className='home__banner_text'>
                        <h1>{pageText.banner.title}</h1>
                        <p dangerouslySetInnerHTML={{ __html: pageText.banner.text }} />
                    </div>
                </Section>
                <Section className='home__about' bgColor='secondary' flexDirection='row' relative overflow='hidden'>
                    <div className='home__about_graphic'>
                        <img src={windowWidth >= 600 ? StripesImage : StripesMobileImage} alt="about" />
                    </div>
                    <div className='home__about_content'>
                        <h2>{pageText.about.title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: pageText.about.text }} />
                        <TextWithArrow wrapperElement="a" textElement="p" text="Sprawdź" color='primary' fontSize="1.5rem" href="/projekty" fontWeight="bold" />
                    </div>
                </Section>
                <Section className='home__structure' alignItems='flex-start'>
                    <div className='structure__header'>
                        <h2 className='structure__title'>{pageText.structure.title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: pageText.structure.description }} />
                    </div>
                    <div className='structure__teams'>
                        <div className='structure__bg' />

                        {pageText.structure.teams.map((team, index) => (
                            <div key={index}>
                                <TextWithArrow textElement='h4' wrapperElement='div' color='secondary' text={team.title} fontSize='1.8rem'></TextWithArrow >
                                <p dangerouslySetInnerHTML={{ __html: team.description }} />
                            </div>
                        ))}
                    </div>
                </Section>
                <Section className='home__joinus'>
                    <a className='joinus__bg' href="https://discord.gg/Uy4t2n6zzu">
                        <div className='joinus__banner'>
                            <p>{pageText.joinUs.text}</p>
                            <img src={DiscordIcon} alt="" />
                        </div>
                    </a>
                </Section>
            </div>
        </Page>
    )
}

export default HomePage