import React from "react";
import "./Input.scss";

function Input(props) {
    switch (props.type) {
        case "toggle":
            return (
                <div className="input toggle">
                    <input
                        id={props.name}
                        name={props.name}
                        value={props.value[0] ? "on" : "off"}
                        onChange={e => {
                            props.value[1](!props.value[0]);
                            props.onChange && props.onChange(e);
                        }}
                        type="checkbox"
                        style={{ opacity: "0", position: "absolute" }}
                    />
                    <label htmlFor={props.name} className="value">
                        {props.value[0] ? "OK" : "__"}
                    </label>
                    <label htmlFor={props.name}>{props.text}</label>
                </div>
            );
        case "number":
            return (
                <div className="input number">
                    <input
                        id={props.name}
                        name={props.name}
                        type="number"
                        required
                        value={props.value[0]}
                        onChange={e => props.value[1](e.currentTarget.value)}
                    />
                    <label htmlFor={props.name}>{props.text}</label>
                </div>
            );
        default:
            return <div className="input" />;
    }
}

export default Input;
