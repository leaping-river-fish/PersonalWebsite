import { React } from "react";
import "./css/modal.css";
import ModelView from "./ModelView";


const Modal = ({ project, onClose }) => {
    if (!project) return null;
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{project.name}</h2>
                <p>{project.description}</p>

                {project.modelPath && (
                    <div style={{ width: "100%", height: "400px" }}> 
                        <ModelView modelPath={project.modelPath} />
                    </div>
                )}
                <p>3D model, interact and zoom </p>

                {project.showcaseimages && project.showcaseimages.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Screenshot ${idx + 1}`}
                        style={{ maxWidth: "100%", marginBottom: "1rem" }}
                    />
                ))}

                <p className="file-header">Viewable or downloadable files</p>

                {project.files && project.files.map((file, idx) => (
                    <a
                        href={file.url}
                        targets="_blank"
                        rel="noreferrer"
                        key={idx}
                        style={{ display: "block", marginBottom: "0.5rem" }}
                    >
                        {file.name}
                    </a>
                ))}

                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
    


