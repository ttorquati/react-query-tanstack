import { useState } from "react"
import { ProjectsQuery } from "../../services/projects.service"
import { Button } from "../../components"
import { Project } from "../../types/project"

export function Projects() {
    const [page, setPage] = useState(1)

    const queryService = new ProjectsQuery()
    const projectsQuery = queryService.useProjects(page, 3)

    if (projectsQuery.isPending) {
        return <span>Loading ...</span>
    }

    if (projectsQuery.isError) {
        return <span>Service unavailable, try again later</span>
    }

    const { pages, data } = projectsQuery.data
    const projects: Project[] = data

    const handlePrevious = () => {
        setPage((prevState) => Math.max(prevState - 1, 1))
    }

    const handleNext = () => {
        if(!projectsQuery.isPlaceholderData) {
            setPage((prevState) => Math.min(prevState + 1, pages))
        }
    }

    return (
        <div className="flex flex-col gap-4 max-w-3xl p-4">
            <h1 className="text-3xl">Projects - Current Page {page}</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project?.id}>{project?.name}</li>
                ))}
            </ul>

            <div className="flex flex-row gap-4">
                <Button onClick={handlePrevious} disabled={page === 1}>Previous</Button>
                <Button onClick={handleNext} disabled={page === pages}>Next</Button>
            </div>
        </div>
    )
}