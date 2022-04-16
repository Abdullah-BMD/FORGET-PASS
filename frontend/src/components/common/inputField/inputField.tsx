
import { InputText } from 'primereact/inputtext';
import { useState } from "react";
import "./inputField.css"


const InputField = (

    { headerLabel, value, setValue, max, placeholder, char, 
        onKeyPress, min, error, name, type = "text", maxLength , 
        id_='filled-password-input' }: 
    { 
        placeholder: string, onKeyPress?: any, char?: number, 
        min?: number, max?: number, value: any, error?: string, 
        setValue?: any, headerLabel?: string, name: string, 
        type?: "text" | "number" | "password", maxLength: number , 
        id_?:string }) => {


    const maxLengthCheck = (object: any) => {
        if (object.target.value.length > maxLength) {
            let value = object.target.value.slice(0, maxLength)
            setValue(value);
        }
    }
    console.log(value, "data7")
    return (
        <div className="input-container">
            <label className="label"><b>{headerLabel}</b></label>
            <label style={{ float: "right", fontSize: "11px" }} className="label">{char != null ? `${char} / ${maxLength}` : ""}</label>
            <InputText
                id={id_}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    setValue(e);
                    maxLengthCheck(e);

                }}
                className="input"
                
            />
            {error && (
                <p className="help is-danger" style=
                    {{ color: 'red', fontSize: "0.9rem" }} >*{error}</p>
            )}
        </div>
    );
};

export default InputField;