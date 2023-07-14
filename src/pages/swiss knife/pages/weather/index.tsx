import { useEffect, useState } from "react";

const KEY_NUMBER =
  "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWB-16064478-3445-479D-AF14-B7C6AC2FC15A";
const KEY_NUMBER_RAIN =
  "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-069?Authorization=CWB-16064478-3445-479D-AF14-B7C6AC2FC15A&format=JSON";

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState<any>();

  const fetchWeatherData = () => {
    return fetch(KEY_NUMBER)
      .then((res) => res.json())
      .then((data) => {
        const LOCALDATA = data.records.location[164];
        const weatherElements = LOCALDATA.weatherElement.reduce(
          (neededElements: any, item: any) => {
            if (["WDSD", "TEMP", "HUMD"].includes(item.elementName)) {
              neededElements[item.elementName] = item.elementValue;
            }
            return neededElements;
          },
          {}
        );
        return {
          observationTime: LOCALDATA.time.obsTime,
          locationName: LOCALDATA.locationName,
          temperature: weatherElements.TEMP,
          windSpeed: weatherElements.WDSD,
        };
      });
  };

  const fetchWeatherRain = () => {
    return fetch(KEY_NUMBER_RAIN)
      .then((res) => res.json())
      .then((data) => {
        const RAINDATA = data.records.locations[0].location[22].weatherElement[0].time[3].elementValue[0].value;
        return { rain: RAINDATA };
      });
  };

  useEffect(() => {
    Promise.all([fetchWeatherData(), fetchWeatherRain()]).then((results) => {
      const [weatherData, rainData] = results;
      setCurrentWeather({ ...weatherData, ...rainData });
    });
  }, []);

  if (!currentWeather) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-[300px] bg-slate-300 shadow-lg">
        <div>
          {new Intl.DateTimeFormat("zh-TW", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(currentWeather.observationTime))}
        </div>
        <div>{currentWeather.locationName}</div>
        <div>目前溫度
          {currentWeather.temperature}
          °C
        </div>
        <div>風速{currentWeather.windSpeed} m/h</div>
        <div>降雨機率{currentWeather.rain}%</div>
        <div>
          <button onClick={() => Promise.all([fetchWeatherData(), fetchWeatherRain()]).then((results) => {
            const [weatherData, rainData] = results;
            setCurrentWeather({ ...weatherData, ...rainData });
          })}>Reset</button>
        </div>
      </div>
    </>
  );
};

export default Weather;
