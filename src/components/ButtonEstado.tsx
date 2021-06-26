import { useState } from "react";

export function ButtonEstado(){
    const [counter, setCounters] = useState(0)

    function increment() {
        // counter += 1;
        setCounters(counter +1)
    }
    return(
        <button onClick={increment}>
            {counter}
        </button>
    )
}


