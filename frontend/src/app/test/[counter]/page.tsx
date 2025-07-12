"use client"

import {useState} from "react";

export default function Page() {
    const [counter, setCounter] = useState(0);

    return <>
        <h1>second page {counter}</h1>
        <button onClick={()=> setCounter(p=> p+1)}>t</button>
    </>
}