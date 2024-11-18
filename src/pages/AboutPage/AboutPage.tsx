import Page from '../../components/Page/Page'
import textSelector from '../../utils/textSelector';
import './AboutPage.css'

function AboutPage() {
    const pageText = textSelector().about;

    return (
        <Page pageTitle={pageText.meta.title} description={pageText.meta.description}>
            <div className='about'>
                AboutPage
            </div>
        </Page>
    )
}

export default AboutPage