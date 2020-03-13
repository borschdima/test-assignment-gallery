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

const ControlPanel = ({ onLoadImage, onGroupHandler, onClearHandler, isGrouped }) => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const onLoadHandler = async () => {
        if (!search) {
            notify("info", "Заполните поле поиска!");
        } else {
            setLoading(true);
            try {
                const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${search}`);
                const { data } = await response.json();

                if (Array.isArray(data)) {
                    notify("info", "По тегу ничего не найдено");
                    setLoading(false);
                    return;
                } else {
                    onLoadImage(data.image_url, search);
                }
            } catch (error) {
                notify("error", "Произошла http ошибка!");
            }

            setLoading(false);
        }
    };

    const onClear = () => {
        setSearch("");
        onClearHandler();
    };

    return (
        <div className="control-panel">
            <ToastContainer />
            <MDBInput label="Поиск по тегу" value={search} className="control-panel__search" onChange={e => setSearch(e.target.value)} />
            <div className="control-panel__buttons mx-3">
                <MDBBtn color="success" size="sm" onClick={onLoadHandler} disabled={loading}>
                    {loading ? "Загрузка..." : "Загрузить"}
                </MDBBtn>
                <MDBBtn color="danger" size="sm" onClick={onClear}>
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
