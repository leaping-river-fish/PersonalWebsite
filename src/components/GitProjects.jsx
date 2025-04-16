import React, { useState, useEffect } from "react";
import axios from "axios";


const GitProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const username = "leaping-river-fish"; 

        axios
            .get(`https://api.github.com/users/${username}/repos`)
            .then((response) => {
                const filteredProjects = response.data.filter(
                    (project) => project.name !== "PersonalWebsite"
                  );
                  setProjects(filteredProjects);
                setLoading(false);
            })
            .catch((err) => {
                setError("Error fetching Github repositories.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading GitHub Projects... </div>  // ADD dot animation
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className="project-grid">
            {projects.map((project) => (
                <a
                    key = {project.id}
                    href = {project.html_url}
                    className="project-card"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="" // WIP
                        alt={project.name}
                        className="project-image"
                    />
                    <div className="project-info">
                        <h3>{project.name}</h3>
                        <p>{project.description || "No description provided"}</p>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default GitProjects;