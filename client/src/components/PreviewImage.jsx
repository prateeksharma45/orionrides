import { useEffect, useRef, useState } from 'react'
import './PreviewImage.css'
import { motion } from 'framer-motion'

const PreviewImage = ({ url, closeImagePreview }) => {
    let previewBgRef = useRef(null)

    const handleBgClick = (event) => {
        if (event.target == previewBgRef.current) {
            closeImagePreview()
        }
    }

    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const imageStyle = {
        width: windowDimensions.height > windowDimensions.width ? '100%' : 'auto',
        height: windowDimensions.height < windowDimensions.width ? '100%' : 'auto',
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        }
    })

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.3,
                ease: "easeInOut"
            }}
            ref={previewBgRef} className="preview-image-wrapper"
            onClick={handleBgClick}>
            <div className="close" onClick={closeImagePreview}>
                <div className="close-icon"></div>
            </div>
            <motion.img
                initial={{ y: "2rem", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "2rem", opacity: 0 }}
                transition={{
                    duration: 0.3,
                    ease: "backInOut"
                }}
                src={url}
                style={imageStyle}
            />
        </motion.div>
    )
}

export default PreviewImage
