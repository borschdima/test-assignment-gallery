import React, { useState } from "react";
import { MDBContainer } from "mdbreact";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Gallery from "./components/Gallery/Gallery";

function App() {
    const [images, setImages] = useState([]);
    const [isGrouped, setIsGrouped] = useState(false);

    const onGroupHandler = () => {
        setIsGrouped(!isGrouped);
    };

    const onLoadImage = (imgUrl, tag) => {
        const ImageItems = [...images];
        ImageItems.unshift({ imgUrl, tag });
        setImages(ImageItems);
    };

    return (
        <main className="App">
            <MDBContainer>
                <ControlPanel onGroupHandler={onGroupHandler} onLoadImage={(imgUrl, tag) => onLoadImage(imgUrl, tag)} isGrouped={isGrouped} />
                <Gallery images={images} isGrouped={isGrouped} />
            </MDBContainer>
        </main>
    );
}

export default App;
