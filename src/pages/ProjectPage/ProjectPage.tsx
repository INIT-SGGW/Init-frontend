import "./ProjectPage.css";

import Section from '../../components/Section/Section'
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
import StarOneIcon from '../../assets/star_1.svg';
import StarTwoIcon from '../../assets/star_2.svg';
import { useParams } from "react-router-dom";

function ProjectPage() {
    const { projectName } = useParams();

    if (!projectName) {
        return null;
    }

    const pageT = textSelector().projects[projectName];
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
                    {!isMobile && <div className='bg_test'>
                        <div className='bg__triangles' />
                        <div className='bg__circle' />
                        <img src={StarOneIcon} alt="star" className='bg__star1' />
                        <img src={StarTwoIcon} alt="star" className='bg__star2' />
                    </div>}
                    {isMobile && <img className='home__banner_bg' src={HomeBgMobileImage} alt="BG image" />}
                    <div className='home__banner_text project__banner'>
                        <h1>{pageText.banner.title}</h1>
                        <p dangerouslySetInnerHTML={{ __html: pageText.banner.text }} />
                    </div>
                </Section>
                <Section className='home__about' bgColor='secondary' flexDirection='row' relative overflow='hidden'>
                    <div className='home__about_graphic'>
                        <img className='graphic__stripes' src={windowWidth >= 600 ? StripesImage : StripesMobileImage} alt="about" />
                        {/* <img className='graphic__laptop' src={LaptopImage} alt="laptop" /> */}
                    </div>
                    <div className='home__about_content'>
                        <h2>{pageText.about.title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: pageText.about.text }} />
                        <TextWithArrow wrapperElement="a" textElement="p" text="Sprawdź" color='primary' fontSize="1.5rem" href="/projekty" fontWeight="400" />
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
                                <TextWithArrow textElement='h4' wrapperElement='div' color='secondary' text={team.title} fontSize='2rem' fontWeight='400'></TextWithArrow >
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

export default ProjectPage