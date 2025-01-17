import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import './PhotoDisplay.css';

const MySwal = withReactContent(Swal);

const catGifs = [
    'https://media.tenor.com/6be0tZhr50QAAAAM/lazy-cat.gif',
    'https://media.tenor.com/WUVEKHTvdbEAAAAM/cat-black-cat.gif',
    'https://media.tenor.com/eJXzrFyI3UEAAAAM/cat-%D0%BA%D0%BE%D1%82.gif',
    'https://media.tenor.com/ruqp-QOLF1gAAAAM/cat-waiting.gif',
    'https://media.tenor.com/TFSWJKHo1LEAAAAM/waiting-patiently-on-you-i-am-bored.gif',
];

const PhotoDisplay = () => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve uploaded images from localStorage
        const images = JSON.parse(localStorage.getItem('uploadedImages'));
        if (images) {
            setUploadedImages(images);
        } else {
            // If no images are found, redirect back to the upload page
            navigate('/');
        }
    }, [navigate]);

    const handleDenoising = (image) => {
        // Select a random cat GIF
        const gif = catGifs[Math.floor(Math.random() * catGifs.length)];

        MySwal.fire({
            title: 'Denoising image...',
            html: `
                <img src="${gif}" alt="Cat waiting" style="width: 100px; margin-bottom: 10px;">
                <div style="width: 100%; background: #ddd; height: 10px; margin-top: 10px;">
                    <div id="progress-bar" style="width: 0%; background: #4caf50; height: 100%;"></div>
                </div>
            `,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                const progressBar = document.getElementById('progress-bar');
                let progress = 0;
                const interval = setInterval(() => {
                    progress += 5;
                    if (progressBar) {
                        progressBar.style.width = `${progress}%`;
                    }

                    if (progress >= 100) {
                        clearInterval(interval);
                        MySwal.close();
                        navigate('/captionizing');
                    }
                }, 100);
            }
        });
    };

    return (
        <div className="photo-display-container">
            <h2>Uploaded Photos</h2>
            <div className="photo-display">
                {uploadedImages.map((image, index) => (
                    <div key={index} className="image-item">
                        <img src={image.url} alt={image.name} />
                        <button onClick={() => handleDenoising(image)}>Denoising</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoDisplay;
