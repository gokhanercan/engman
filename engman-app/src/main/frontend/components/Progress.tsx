import { ProgressBar } from "@vaadin/react-components/ProgressBar.js";
import { useState } from "react";

interface ProgressProps {
    min?: number;
    max?: number;
    value: number;
    label?: string;
    showValue?: boolean;
}

export default function Progress({ min=0,max=100,value,label="",showValue=false}: ProgressProps) {
    const chooseTheme = (value:number) => {
        if (value < 30) {
            return "success";
        } else if (value < 40 && value >= 30) {
            return "warning";
        } else {
            return "error";
        }
    }

    return (
        <>
            {label && <span>{label}</span>}
            {showValue && <span> ({value}/{max})</span>}
            <ProgressBar min={min} max={max} value={value} indeterminate={false} 
                         theme={chooseTheme(value)}
                        //  className="m-2"
            />
        </>
    );
}