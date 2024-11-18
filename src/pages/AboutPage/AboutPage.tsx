import Page from '../../components/Page/Page'
import Section from '../../components/Section/Section';
import textSelector from '../../utils/textSelector';
import './AboutPage.css'
import InstagramIcon from "../../assets/instagram-icon.svg";
import FacebookIcon from "../../assets/facebook-icon.svg";
import LinkedinIcon from "../../assets/linkedin-icon.svg";
import MailIcon from "../../assets/mail-icon.svg";

const ClickableIcon = ({ href, icon }: { href: string, icon: string }) => {
    return (
        <a href={href} target='__blank'>
            <img src={icon} alt="" />
        </a>
    )
}

function AboutPage() {
    const pageText = textSelector().about;

    return (
        <Page pageTitle={pageText.meta.title} description={pageText.meta.description}>
            <div className='about'>
                <Section className='about__section'>
                    <h1>{pageText.title}</h1>
                    <p dangerouslySetInnerHTML={{ __html: pageText.description }} />
                </Section>
                <Section className='about__section'>
                    <h4>{pageText.contact.title}</h4>
                    <p dangerouslySetInnerHTML={{ __html: pageText.contact.description }} />
                </Section>
                <Section className='about__section about__team'>
                    <h4>{pageText.team.title}</h4>
                    <div className='team__members'>
                        {
                            pageText.team.members.map((elem, index) => {
                                console.log(elem)
                                return (
                                    <div key={index} className='team__member'>
                                        <img src={elem.photo} alt="Headshot" />
                                        <div>
                                            <h6>{elem.name}</h6>
                                            <span>{elem.position}</span>
                                            <p>{elem.team}</p>
                                            <div>
                                                {elem.profiles.facebook && <ClickableIcon href={elem.profiles.facebook} icon={FacebookIcon} />}
                                                {elem.profiles.instagram && <ClickableIcon href={elem.profiles.instagram} icon={InstagramIcon} />}
                                                {elem.profiles.linkedin && <ClickableIcon href={elem.profiles.linkedin} icon={LinkedinIcon} />}
                                                {elem.profiles.mail && <ClickableIcon href={`mailto:${elem.profiles.mail}`} icon={MailIcon} />}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Section>
            </div>
        </Page>
    )
}

export default AboutPage