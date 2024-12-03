import Page from '../../components/Page/Page'
import Section from '../../components/Section/Section';
import textSelector from '../../utils/textSelector';
import './AboutPage.css'
import InstagramIcon from "../../assets/instagram-white-icon.svg";
import FacebookIcon from "../../assets/facebook-white-icon.svg";
import LinkedinIcon from "../../assets/linkedin-white-icon.svg";
import InstagramBlackIcon from "../../assets/instagram-icon.svg";
import FacebookBlackIcon from "../../assets/facebook-icon.svg";
import LinkedinBlackIcon from "../../assets/linkedin-icon.svg";
import GithubIcon from "../../assets/github-white-icon.svg";
import membersData from './membersData';
import { Member } from './types';
import NoPhotoIcon from "../../assets/no-photo-icon.svg";

const ClickableIcon = ({ href, icon }: { href: string, icon: string }) => {
    return (
        <a href={href} target='__blank'>
            <img src={icon} alt="" />
        </a>
    )
}

const sortGroup = (group: Array<Member>) => {
    // first with photos, then alphabetically by last name, then by first name

    const sortedByName = group.sort((a, b) =>
        a.name.split(" ")[1].localeCompare(b.name.split(" ")[1]) ||
        a.name.split(" ")[0].localeCompare(b.name.split(" ")[0]))

    const withPhoto = sortedByName.filter(member => member.photo)
    const withoutPhoto = sortedByName.filter(member => !member.photo)

    return [...withPhoto, ...withoutPhoto]
}

function AboutPage() {
    const pageText = textSelector().about;

    return (
        <Page pageTitle={pageText.meta.title} description={pageText.meta.description}>
            <div className='about'>
                {/* <img className='about_bg' src="/src/assets/init-logo-black.svg" alt="Init logo" /> */}
                <Section className='about__section'>
                    <h1>{pageText.title}</h1>
                    <p className='about__center' dangerouslySetInnerHTML={{ __html: pageText.description }} />
                </Section>
                <Section className='about__section'>
                    <h2>{pageText.contact.title}</h2>
                    <p className='about__center' dangerouslySetInnerHTML={{ __html: pageText.contact.description }} />
                    <div className='about__social'>
                        <a href="https://www.instagram.com/kn_init_/" target="_blank">
                            <img src={InstagramBlackIcon} alt="Instagram" />
                        </a>
                        <a href="https://www.facebook.com/kninit/" target="_blank">
                            <img src={FacebookBlackIcon} alt="Facebook" />
                        </a>
                        <a href="https://www.linkedin.com/company/ko%C5%82o-naukowe-init/about/" target="_blank">
                            <img src={LinkedinBlackIcon} alt="Linkedin" />
                        </a>
                    </div>
                </Section>
                <Section className='about__section about__team'>
                    <h2>{pageText.team.title}</h2>
                    <div className='team__members'>
                        {
                            membersData.map((group) => {
                                const sortedGroup = sortGroup(group)

                                return (
                                    sortedGroup.map((member, index) => {
                                        return (
                                            <div key={index} className='team__member'>
                                                <img src={member.photo ? member.photo : NoPhotoIcon} alt="Headshot" />
                                                <div>
                                                    <div className='member__header'>
                                                        <h6>{member.name}</h6>
                                                        <span>{member.position}</span>
                                                    </div>
                                                    {/* <p>{member.team}</p> */}
                                                    <div className='member__socials'>
                                                        {member.profiles.facebook && <ClickableIcon href={member.profiles.facebook} icon={FacebookIcon} />}
                                                        {member.profiles.instagram && <ClickableIcon href={member.profiles.instagram} icon={InstagramIcon} />}
                                                        {member.profiles.linkedin && <ClickableIcon href={member.profiles.linkedin} icon={LinkedinIcon} />}
                                                        {member.profiles.github && <ClickableIcon href={member.profiles.github} icon={GithubIcon} />}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
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