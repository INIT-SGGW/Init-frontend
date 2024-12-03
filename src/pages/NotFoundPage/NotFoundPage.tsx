import Page from '../../components/Page/Page'
import './NotFoundPage.css'

function NotFoundPage() {
    return (
        <Page pageTitle="404 | KN init" description="Strona niedostępna" noIndex >
            <div className='not-found'>
                <h1>404</h1>
                <p>Page not found</p>
            </div>
        </Page>
    )
}

export default NotFoundPage