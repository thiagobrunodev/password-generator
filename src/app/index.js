import React, { useState, createRef } from "react";
import { useDencrypt } from "use-dencrypt-effect";

import "./App.scss";
import Input from "components/Input";
import Icon from "components/Icon";
import Password from "password-generator";

function App() {
    const options = {
        length: useState(window.innerWidth > 500 ? 20 : 10),
        memorable: useState(false),
        uppercase: useState(true),
        lowercase: useState(true),
        numbers: useState(true),
        symbols: useState(true)
    };

    const { result, dencrypt } = useDencrypt();

    const inputPassword = createRef();
    const inputLength = createRef();
    const notification = createRef();

    const newPassword = e => {
        e.preventDefault();
        dencrypt(
            options.memorable[0] ||
                options.uppercase[0] ||
                options.lowercase[0] ||
                options.numbers[0] ||
                options.symbols[0]
                ? Password(
                      options.length[0],
                      options.memorable[0],
                      new RegExp(
                          `[\
                        ${options.uppercase[0] ? "A-Z" : ""}\
                        ${options.lowercase[0] ? "a-z" : ""}\
                        ${options.numbers[0] ? "\\d" : ""}\
                        ${
                            options.symbols[0]
                                ? "\"'\\[\\]{}&'\\/><%^_.;:-=!@,#$"
                                : ""
                        }\
                    ]`.replace(/\s/g, "")
                      )
                  )
                : "*".repeat(options.length[0])
        );
        // inputLength.current.blur()
        console.log(inputLength)
    };

    const copyPassword = e => {
        e.preventDefault();
        inputPassword.current.select();
        document.execCommand("copy");
        document.getSelection().removeAllRanges();
        if (notification.current) {
            notification.current.style.display = "flex";
            setTimeout(() => {
                if (notification.current)
                    notification.current.style.display = "none";
            }, 1000);
        }
    };

    const onHandleOptions = () => {
        options.memorable[1](false);
    };

    const onHandleMemorable = () => {
        options.uppercase[1](options.memorable[0]);
        options.lowercase[1](options.memorable[0]);
        options.numbers[1](options.memorable[0]);
        options.symbols[1](options.memorable[0]);
    };

    return (
        <div className="App">
            <div className="options">
                <div className="wrapper">
                    <form onSubmit={newPassword}>
                        <Input
                            ref={inputLength}
                            type="number"
                            name="length"
                            value={options.length}
                            text="Length"
                        />
                    </form>
                    <Input
                        type="toggle"
                        name="memorable"
                        value={options.memorable}
                        text="Memorable"
                        onChange={onHandleMemorable}
                    />
                    <Input
                        type="toggle"
                        name="uppercase"
                        value={options.uppercase}
                        text="Uppercase"
                        onChange={onHandleOptions}
                    />
                    <Input
                        type="toggle"
                        name="lowercase"
                        value={options.lowercase}
                        text="Lowercase"
                        onChange={onHandleOptions}
                    />
                    <Input
                        type="toggle"
                        name="numbers"
                        value={options.numbers}
                        text="Numbers"
                        onChange={onHandleOptions}
                    />
                    <Input
                        type="toggle"
                        name="symbols"
                        value={options.symbols}
                        text="Symbols"
                        onChange={onHandleOptions}
                    />
                </div>
            </div>
            <div className="content">
                <div ref={notification} className="notification">
                    <span>Copied to clipboard</span>
                </div>
                <h1>Password Generator</h1>
                <div className="container">
                    {!result && (
                        <button
                            className="generatePassword"
                            onClick={newPassword}
                        >
                            Generate your password
                        </button>
                    )}

                    {result && (
                        <div className="password">
                            <button onClick={copyPassword}>
                                <input
                                    size={result.length}
                                    ref={inputPassword}
                                    value={result}
                                    type="text"
                                    readOnly
                                />
                                <Icon name="clipboard" size="100px" />
                            </button>
                            <button
                                className="newPassword"
                                onClick={newPassword}
                            >
                                <Icon name="reload" size="50px" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
