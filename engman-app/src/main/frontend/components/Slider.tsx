import React, { useState, useId } from 'react';
// import { init } from './../generated/jar-resources/FlowBootstrap.d';

interface SliderProps {
    initialTime?: number;
    maxTime: number;
    onTimeChange?: (time: number) => void;
}

export default function Slider({ initialTime = 0, maxTime, onTimeChange }: SliderProps) {
    const [time, setTime] = useState<number>(initialTime);

    const id = useId().replace(/:/g,"");;
    // console.log(id);

    const minTime = 0;
    const ticksInterval = maxTime / (maxTime-minTime);
    const ticks = [...Array(maxTime+1).keys()];
    // console.log(ticks);
    
    const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const selectedTime:number = Number(event.target.value);
        setTime(selectedTime);
        if (onTimeChange) {
            onTimeChange(selectedTime);
        }
    };

    return (
        <div style={{ textAlign: "center" }} className={`slider-comp compid-${id}`}>
            Ticks interval: {ticksInterval}
            <br />

            <input style={{ }} type="range" id="vol" name="vol" min={minTime} 
                list={`tickmarks-${id}`}
                max={maxTime}
                value={time}
                onChange={onChange}
            />
            {/* Ticks */}
            <datalist id={`tickmarks-${id}`} className='tickmarks'>
                {ticks.map((tick, index) => ( 
                    <option key={index} value={tick} label={tick.toString()}>
                    </option>
                ))}
            </datalist>
            
            <br/><br/>
            <b>time:</b> {time} months
            <span className='text-left'  style={{float:"left"}}  >t: {minTime}</span>
            <span className='text-right' style={{float:"right"}} >tmax:{maxTime}</span>
        </div>
    );
}