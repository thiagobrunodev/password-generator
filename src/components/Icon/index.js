import React from "react";

const Icons = {
    clipboard: require('assets/icons/clipboard.svg'),
    reload: require('assets/icons/reload.svg')
}

function Icon(props) {
    return (
        <span
            className={`icon icon-${props.name} ${props.className || ''}`}
            style={{
                display: "inline-block",
                width: props.size,
                height: props.size,
                background: `url("${Icons[props.name] || ''}") center no-repeat`,
                backgroundSize: '100%'
            }}
        ></span>
    );
}

export default Icon;
