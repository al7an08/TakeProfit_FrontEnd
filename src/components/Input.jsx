import { useState } from "react";


export const Input = ({ id, type, placeholder, min, max, label }) => {
    const [value, setValue] = useState(null);

    const [isValid, setIsValid] = useState(false)

    const validation = (value) => {
        setValue(value);
        if (typeof value === 'number' && value >= min && value <= max) {
            setIsValid(true);
        }
        else {
            setIsValid(false);
        }
    }


    return (
        <div>
            <div>
                <label>{label}</label>
            </div>
            <input onChange={(e) => { validation(e.target.value) }} placeholder={placeholder} min={min} max={max} id={id} type={type}></input>
        </div >)
}