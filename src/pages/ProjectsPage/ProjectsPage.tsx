import Page from '../../components/Page/Page'
import textSelector from '../../utils/textSelector'
import projectsData from './projectsData';
import './ProjectsPage.css'

function ProjectsPage() {
    const pageText = textSelector().projects;

    return (
        <Page pageTitle={pageText.meta.title} description={pageText.meta.description} paddingBottom={false}>
            <div className='projects'>
                {
                    projectsData.map((project, index) => (
                        <a key={index} href={project.href} className='projects__project' >
                            <div>
                                <h4>{project.title}</h4>
                                <p>{project.description}</p>
                            </div>
                        </a>
                    ))
                }
            </div>
        </Page>
    )
}

export default ProjectsPage