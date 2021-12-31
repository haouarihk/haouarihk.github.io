import { Project } from "../config"


const ProjectCard = ({ project }: { project: Project }) => {



    return <div className="card">
        {project.name}
    </div>
}

export default ProjectCard