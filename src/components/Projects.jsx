import React from "react";
import { motion } from "framer-motion";

const projectsData = [
  { title: "Project 1", description: "A brief description of my project." },
  { title: "Project 2", description: "A brief description of my project." },
  { title: "Project 3", description: "A brief description of my project." },
];

const Projects = () => {
  return (
    <section id="projects" className="p-8">
      <h2 className="text-3xl font-bold text-center">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.title}
            className="border p-4 rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p>{project.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
