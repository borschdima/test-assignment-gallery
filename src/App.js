import React, { useState } from "react";
import { MDBContainer } from "mdbreact";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Gallery from "./components/Gallery/Gallery";

function App() {
    const [images, setImages] = useState([]);
    const [isGrouped, setIsGrouped] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const onGroupHandler = () => {
        setIsGrouped(!isGrouped);
    };

    const onClearHandler = () => {
        setSearchValue("");
        setImages([]);
    };

    const onChangeSearchHandler = value => {
        setSearchValue(value);
    };

    const onLoadImage = (imgUrl, tag) => {
        const ImageItems = [...images];
        ImageItems.unshift({ imgUrl, tag });
        setImages(ImageItems);
    };

    return (
        <main className="App">
            <MDBContainer>
                <ControlPanel
                    onGroupHandler={onGroupHandler}
                    onClearHandler={onClearHandler}
                    onChangeSearchHandler={value => onChangeSearchHandler(value)}
                    onLoadImage={(imgUrl, tag) => onLoadImage(imgUrl, tag)}
                    isGrouped={isGrouped}
                    searchValue={searchValue}
                />
                <Gallery images={images} isGrouped={isGrouped} onChangeSearchHandler={value => onChangeSearchHandler(value)} />
            </MDBContainer>
        </main>
    );
}

export default App;
