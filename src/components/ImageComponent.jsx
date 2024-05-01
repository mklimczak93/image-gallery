import React, { useState } from "react";
import { Blurhash } from "react-blurhash";
import LoupeIcon from '../assets/icons/loupe-icon-18-white.svg'


export default function ImageComponent(props) {
    //creating a state to determine whether to use actual image ofr image hash in case the image has not yet loaded
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageDetail, setImageDetail] = useState(false);

    const handleLoad = () => {
        setImageLoaded(true);
    }

    // const showDetail = () => {
    //     console.log('increasing')
    //     setImageDetail(true)
    // }

    return (
        <div className="image-composition">
            <img src={LoupeIcon} className="icon loupe-icon" alt="Magnifying glass icon - visible on hover"/>
            <img 
                onLoad={handleLoad}
                loading="lazy" 
                src={props.src} 
                width={100}
                height={200}
                className="painting" 
                alt={props.alt}
                //onClick = {showDetail}
            />
            <div className="blurhash"
                style = {{display: imageLoaded ? 'none' : 'block'}}>
                <Blurhash
                    hash={props.blurhash}
                    width={window.width > 770 ? 150 : 125}
                    height={window.width > 770 ? 300 : 250}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                />
            </div>
        </div>
    )
}