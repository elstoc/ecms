import React, { MouseEvent, FC, ReactElement, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { useNavigate } from 'react-router-dom';
import { useKeyPress } from '../../hooks/useKeyPress';
import { ImageData } from '../../types/Gallery';
import { GalleryImage } from './GalleryImage';

import './LightBox.css';

type LightBoxProps = {
    parentTitle: string;
    currImage: ImageData;
    prevImage: ImageData | undefined;
    nextImage: ImageData | undefined;
}

export const LightBox: FC<LightBoxProps> = ({ parentTitle, currImage, prevImage, nextImage }): ReactElement => {
    const navigate = useNavigate();

    const goBack = () => {
        const exitFs = async () => document.exitFullscreen();
        exitFs().catch(() => null);
        navigate('..', { replace: true });
    };

    const handleOuterClick = (event: MouseEvent) => {
        if (event.target === event.currentTarget) {
            goBack();
        }
    };

    const restartFadeOut = () => {
        const elements = document.querySelectorAll<HTMLElement>('.fadeOut');
        elements.forEach((element) => {
            element.classList.remove('fadeOut');
            setTimeout(() => { element.classList.add('fadeOut'); }, 10);
        });
    };

    const goPrevImage = () => {
        prevImage && navigate(`../${prevImage.fileName}`, { replace: true });
    };

    const goNextImage = () => {
        nextImage && navigate(`../${nextImage.fileName}`, { replace: true });
    };

    useEffect(() => {
        restartFadeOut();
    });

    useEffect(() => {
        const requestFs = async () => document.body.requestFullscreen();
        requestFs().catch(() => null);
    }, []);

    useKeyPress(['Backspace', 'Escape'], goBack);
    useKeyPress(['ArrowLeft'], goPrevImage);
    useKeyPress(['ArrowRight'], goNextImage);
    useKeyPress(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'], null);
    
    return (
        <div className='LightBox' onClick={handleOuterClick} onMouseMove={restartFadeOut}>
            <Helmet><title>{parentTitle} - {currImage.fileName}</title></Helmet>
            <div className='close fadeOut' onClick={goBack}>&times;</div>
            {prevImage && <div className='prev fadeOut' onClick={goPrevImage}>&#10094;</div>}
            {nextImage && <div className='next fadeOut' onClick={goNextImage}>&#10095;</div>}
            <GalleryImage url={currImage.fhdSrcUrl} alt={currImage.fileName} />
            <div className='image-info fadeOut'>{currImage.description}</div>

            <div className='preload'>
                {prevImage && <GalleryImage url={prevImage.fhdSrcUrl} alt='preload' />}
                {nextImage && <GalleryImage url={nextImage.fhdSrcUrl} alt='preload' />}
            </div>
        </div>
    );
};
