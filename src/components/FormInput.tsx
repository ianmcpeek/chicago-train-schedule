import React, { useState } from "react";
import { useCallback } from "react";
import './FormInput.css';

function FormInput({ id, label, value, fnOnChange }:{
    id: string,
    label: string,
    value: string,
    fnOnChange: (val: any) => void
})
{
    const onChange = useCallback((change: any) => {
        fnOnChange(change.target.value);
    }, [fnOnChange]);

    return (
        <div className="form-input">
            <label htmlFor={id}>{label}</label>
            <input id={id} value={value} onChange={onChange}></input>
        </div>
    );
}

export default FormInput;