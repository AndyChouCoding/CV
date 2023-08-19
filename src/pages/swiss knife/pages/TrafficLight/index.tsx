import { useEffect, useState } from "react";



const TrafficLight = () => {

    const [light, setLight] = useState<1|2|3>(1);


    let red;
    let yellow;
    let green;
    let time:number;

    if (light === 1) {
        red = "red";
        time = 3000;

    }if(light === 2) {
        yellow = "yellow";
        time = 1000;

    }if (light === 3) {
        green = "green";
        time = 2000;
    }

    useEffect(() => {
        const change = setTimeout(() => {
          setLight((prev) => (prev === 1 ? 3 : (prev - 1) as 1 | 2 | 3));
        }, time);
        return () => clearTimeout(change);
      }, [light]);


    return<>
        <div className="mt-20 border-[1px] border-solid border-black p-12 bg-slate-600">
            <span style={{background:red}} className="p-8 px-10 m-2 rounded-full border-[1px] border-solid border-black object-cover"></span>
            <span style={{background:yellow}} className="p-8 px-10 m-2 rounded-full border-[1px] border-solid border-black"></span>
            <span style={{background:green}} className="p-8 px-10 m-2 rounded-full border-[1px] border-solid border-black"></span>
        </div>
    </>
}
export default TrafficLight;
