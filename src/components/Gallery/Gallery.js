import React, { useMemo } from "react";

import "./Gallery.scss";

const Gallery = ({ images, isGrouped }) => {
    const gallery = useMemo(() => {
        if (isGrouped) {
            // Collect all tags we have
            const tags = [];
            images.forEach(({ tag }) => {
                if (!tags.find(item => item === tag)) tags.push(tag);
            });

            // Rendering all images for each tag
            return tags.map((tag, index) => (
                <div className="gallery__group" key={index}>
                    <h2>{tag}</h2>
                    <ul className="gallery__images">
                        {images
                            .filter(img => img.tag === tag)
                            .map(({ imgUrl, tag }, index) => (
                                <li className="gallery__item" key={index}>
                                    <img className="gallery__img" src={imgUrl} data-tag={tag} alt="some gif" />
                                </li>
                            ))}
                    </ul>
                </div>
            ));
        } else {
            // Just rendering all images
            return (
                <ul className="gallery__images">
                    {images.map(({ imgUrl, tag }, index) => (
                        <li className="gallery__item" key={index}>
                            <img className="gallery__img" src={imgUrl} data-tag={tag} alt="some gif" />
                        </li>
                    ))}
                </ul>
            );
        }
    }, [images, isGrouped]);

    return <div className="gallery">{gallery}</div>;
};

export default Gallery;
