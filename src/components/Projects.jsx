import React from "react";
import ProjectCard from "./ProjectCard";
import useProjects from "../hooks/useProjects";

const Projects = () => {
  const { projects, loading, error } = useProjects();

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error loading projects: {error}</p>;

  return (
    <section id="projects" className="p-8">
      <h2 className="text-3xl font-bold text-center">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
