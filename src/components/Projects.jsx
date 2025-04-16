import { React, useState } from "react";
import GitProjects from "./GitProjects";
import "./css/projects.css";

const hardcodedProjects = [
    {
        id: 1,
        name: "EcoSystem App Design",
        description: "An app designed using Figma, SHAD Design Entrepreneurship project",
        link: "",
        image: "/images_tbs/ecosystem_logo.png",
        tags: ["Figma", "Canva", "Design", "Group"],
    },

    {
        id: 2,
        name: "Solar-powered Car Design",
        description: "Car designed and assembled in SolidWorks",
        link: "",
        image: "/images_tbs/solidworks_car.png",
        tags: ["SolidWorks", "Design"],
    },
]

function Projects() {
    return (
        <div style={{ padding: "2rem" }}>
            {/* GitHub Projects */}
            <section>
                <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>GitHub Projects</h2>
                <GitProjects />
            </section>
                
            {/* Hardcoded Projects */}
            <section>
                <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Other Projects</h2>
                <div className="project-grid" >
                    {hardcodedProjects.map((project) => (
                        <a
                            key={project.id}
                            href={project.link}
                            className="project-card"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img 
                                src={project.image}
                                alt={project.name}
                                className="project-image"
                            />
                            <div className="project-info">
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                            </div>
                            <div className="tags">
                                {project.tags.map((tag, idx) => (
                                    <span className="tag" key={idx}>
                                    {tag}
                                    </span>
                                ))}
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Projects;

