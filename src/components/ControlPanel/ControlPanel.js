import React, { useState } from "react";
import { MDBInput, MDBBtn } from "mdbreact";
import { ToastContainer, toast } from "react-toastify";

import "./ControlPanel.scss";

const notify = (type, message) => {
    return toast[type](message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });
};

const ControlPanel = ({ onLoadImage, onGroupHandler, onClearHandler, onChangeSearchHandler, isGrouped, searchValue }) => {
    const [loading, setLoading] = useState(false);

    const onLoadHandler = async () => {
        if (!searchValue) {
            notify("info", "Заполните поле поиска!");
        } else {
            setLoading(true);
            try {
                const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${searchValue}`);
                const { data } = await response.json();

                if (Array.isArray(data)) {
                    notify("info", "По тегу ничего не найдено");
                    setLoading(false);
                    return;
                } else {
                    onLoadImage(data.image_url, searchValue);
                }
            } catch (error) {
                notify("error", "Произошла http ошибка!");
            }

            setLoading(false);
        }
    };

    return (
        <div className="control-panel">
            <ToastContainer />
            <MDBInput label="Поиск по тегу" value={searchValue} className="control-panel__search" onChange={e => onChangeSearchHandler(e.target.value)} />
            <div className="control-panel__buttons mx-3">
                <MDBBtn color="success" size="sm" onClick={onLoadHandler} disabled={loading}>
                    {loading ? "Загрузка..." : "Загрузить"}
                </MDBBtn>
                <MDBBtn color="danger" size="sm" onClick={onClearHandler}>
                    Очистить
                </MDBBtn>
                <MDBBtn color="info" size="sm" onClick={onGroupHandler}>
                    {isGrouped ? "Разгруппировать" : "Группировать"}
                </MDBBtn>
            </div>
        </div>
    );
};

export default ControlPanel;
