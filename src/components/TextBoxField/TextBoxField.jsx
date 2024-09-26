import React, { useEffect, useRef } from "react";
import style from "./TextBoxField.module.css";
import { InputText } from "primereact/inputtext";

export const TextBoxField = React.forwardRef(
    (
        {
            textLabel,
            value,
            name,
            type = "text",
            onChange,
            direction = "column",
            disabled = false,
            labelWidth = "100%",
            errorText = "",
            placeholder = "",
            prefix = "",
            onKeyDown,
            isFocused,
            onFocusChange,
        },
        inputRef
    ) => {
        const styles = {
            width: labelWidth,
            fontSize: "14px",
        };

        useEffect(() => {
            if (isFocused) {
                inputRef.current.focus();
                onFocusChange();
            }
        }, [isFocused, onFocusChange]);

        return (
            <>
                <div
                    className={`${style.item__group} ${
                        direction === "column" ? style.item__column : style.item__row
                    }`}
                >
                    {textLabel ? <label style={styles}>{textLabel}</label> : <></>}

                    <InputText
                        className={`p-inputtext-sm ${style.textbox__field}`}
                        ref={inputRef} // Forward the ref directly to the InputText component
                        value={value}
                        name={name}
                        type={type}
                        onChange={onChange}
                        autoComplete="off"
                        disabled={disabled}
                        placeholder={placeholder}
                        prefix={prefix}
                        onKeyDown={onKeyDown}
                    />
                </div>
                {errorText && (
                    <p
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            color: "tomato",
                            fontSize: "14px",
                            fontWeight: "600",
                        }}
                    >
                        {errorText}
                    </p>
                )}
            </>
        );
    }
);
