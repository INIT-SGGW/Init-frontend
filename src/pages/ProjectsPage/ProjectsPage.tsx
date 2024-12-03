import Page from '../../components/Page/Page'
import { useWindowWidth } from '../../hooks';
import textSelector from '../../utils/textSelector'
import projectsData from './projectsData';
import './ProjectsPage.css'

function ProjectsPage() {
    const pageText = textSelector().projectsList;
    const width = useWindowWidth();

    return (
        <Page pageTitle={pageText.meta.title} description={pageText.meta.description} paddingBottom={false}>
            <div className='projects'>
                {/* {
                    projectsData.map((project, index) => (
                        <a key={index} href={project.href} className='projects__project' >
                            <div>
                                <h4>{project.title}</h4>
                                <p>{project.description}</p>
                            </div>
                        </a>
                    // )
                } */}
                {
                    projectsData.map((project, index) => {
                        const projectNameElement = document.getElementsByClassName('project__name')[index] as HTMLHeadingElement;
                        if (projectNameElement) {
                            console.log(width, projectNameElement.innerText.length)
                            projectNameElement.style.fontSize = `min(${width / projectNameElement.innerText.length}px, 3rem)`;
                        }

                        return (
                            <a key={index} href={project.href} className='projects__project' style={{ backgroundImage: 'url("/src/assets/gamejam-bg.jpg")' }} >
                                <h2 className="project__name">{project.title}</h2>
                            </a>
                        )
                    })
                }
            </div>
        </Page>
    )
}

export default ProjectsPage