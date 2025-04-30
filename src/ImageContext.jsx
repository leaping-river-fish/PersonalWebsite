import react, { createContext, useContext, useState, useEffect } from 'react';

const ImageContext = createContext();

const baseUrl = import.meta.env.VITE_API_URL;

export const useImageContext = () => {
    return useContext(ImageContext);
};

export const ImageProvider = ({ children }) => {
    const [fundraisingImages, setFundraisingImages] = useState([]);
    const [eventImages, setEventImages] = useState([]);
    const [artImages, setArtImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const loadImages = async () => {
            try {
                const [fundraising, eventAdvertising, art] = await Promise.all([
                    fetch(`${baseUrl}/getImages?category=Fundraising`).then(res => res.json()),
                    fetch(`${baseUrl}/getImages?category=Event-Advertising`).then(res => res.json()),
                    fetch(`${baseUrl}/getImages?category=Art`).then(res => res.json())
                ]);

                setFundraisingImages(fundraising);
                setEventImages(eventAdvertising);
                setArtImages(art);
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadImages();
    }, []);

    return (
        <ImageContext.Provider value={{ fundraisingImages, eventImages, artImages }}>
            {children}
        </ImageContext.Provider>
    );
};
