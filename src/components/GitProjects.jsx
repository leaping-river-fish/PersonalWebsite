import React, { useState, useEffect } from "react";
import axios from "axios";


const GitProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const languageColors = {
        javascript: "#f1e05a",
        python: "#3572A5",
        java: "#b07219",
        cpp: "#f34b7d",
        "c#": "#178600",
        typescript: "#2b7489",
        go: "#00ADD8",
        ruby: "#701516",
        php: "#4F5D95",
        swift: "#ffac45",
        html: "#e34c26",
        css: "#9b4dca",
        rust: "#dea584",
        nodejs: "#8CC84B",
        react: "#61DAFB",
        golang: "#00ADD8",
        wip: "#000",
        tailwindcss:"#38BDF8",
      };
    
      const libraryColors = {
        react: "#61DAFB",
        vite: "#FF4D4F",
        numpy: "#4F8B31",
        expressjs: "#444444",
        cv2: "#5C3EE8",
      }

      const extraColors = {
        mongodb: "#47A248",
        redis: "#DC382D",
        sendgrid: "#1A8CD8",
        docker: "#2496ED",
        simulator: "#FF7F50",
        ai: "#00CFFF",
        api: "#34B7F1",
        app: "#3B82F6",
      }

    const pastelColorMap = {};

    function isBright(hexColor) {
        return getBrightness(hexColor) > 170;
    }

    function getBrightness(hexColor) {
        const color = hexColor.replace("#", "");
      
        const r = parseInt(color.substr(0, 2), 16);
        const g = parseInt(color.substr(2, 2), 16);
        const b = parseInt(color.substr(4, 2), 16);
      
        return (r * 299 + g * 587 + b * 114) / 1000;
      }


    function generateBrightPastel() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 50;
        const lightness = 50;

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`; 
    }

    function getTagColor(tag) {
        const lowerTag = tag.toLowerCase();
        const langColor = languageColors[lowerTag];

        if (lowerTag.includes("-")) {
            return "#4B6EAF"
        }

        if (languageColors[lowerTag]) {
            return languageColors[lowerTag];
        }

        if (libraryColors[lowerTag]) {
            return libraryColors[lowerTag];
        }

        if (extraColors[lowerTag]) {
            return extraColors[lowerTag];
        }

        if (pastelColorMap[lowerTag]) {
            return pastelColorMap[lowerTag];
        }

        if (langColor && isBright(langColor)) {
            return langColor;
        }

        const newColor = generateBrightPastel();
        pastelColorMap[lowerTag] = newColor;
        return newColor;
    }

    const getProjectTags = async (projectName) => {
        try {
            const response = await axios.get(
                `https://api.github.com/repos/leaping-river-fish/${projectName}/topics`,
                {
                    headers: {
                        Accept: "application/vnd.github.mercy-preview+json",
                    },
                }
            );
            return response.data.names; 
        } catch (error) {
            console.error("Error fetching tags", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            const username = "leaping-river-fish";

            try {
                const response = await axios.get(
                    `https://api.github.com/users/${username}/repos`
                );
                const filteredProjects = response.data.filter(
                    (project) => project.name !== ""
                );
                
                const updatedProjects = await Promise.all(
                    filteredProjects.map(async (project) => {
                        const tags = await getProjectTags(project.name);
                        return { ...project, topics: tags }; 
                    })
                );

                setProjects(updatedProjects); 
                setLoading(false);
            } catch (err) {
                setError("Error fetching Github repositories.");
                setLoading(false);
            }
        };

        fetchProjects(); 
    }, []);

    if (loading) {
        return <div>Loading GitHub Projects...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="project-grid">
            {projects.map((project) => (
                <a
                    key={project.id}
                    href={project.html_url}
                    className="project-card"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {/* <img
                        src="" 
                        alt={project.name}
                        className="project-image"
                    /> */}
                    <div className="project-info">
                        <h3>{project.name}</h3>
                        <p>{project.description || "No description provided"}</p>
                    </div>

                    <div className="tags">
                        {project.topics && project.topics.length > 0 ? (
                            project.topics.map((tag, idx) => (
                                <span 
                                    className="tag" 
                                    key={idx}
                                    style={{
                                        backgroundColor: getTagColor(tag),
                                        color:"#fff",
                                    }}
                                >
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span className="tag" style={{ backgroundColor: "#ddd", color: "#333" }}>
                                No tags available
                            </span>
                        )}
                    </div>
                </a>
            ))}
        </div>
    );
};

export default GitProjects;