import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = ({ modelPath }) => {
    const { scene } = useGLTF(modelPath);
    return <primitive object={scene} />
};

const ModelView = ({ modelPath }) => {
    return (
        <Canvas 
            style={{ height: "500px", width: "100%" }}
            camera={{ position: [0, 0, 65], fov: 50 }}
        >
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
                <Model modelPath={modelPath} />
                <OrbitControls />
            </Suspense>
        </Canvas>
    );
};

export default ModelView;

