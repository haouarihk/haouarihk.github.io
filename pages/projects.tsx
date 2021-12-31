import { NextPage } from "next";
import List from "../components/listProjects";
import config from "../config"

const Projects: NextPage = () => (
    <main>
        <List projects={config.projects} selected={0}/>
    </main>

)

export default Projects;