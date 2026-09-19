import { useEffect, useState } from 'react';

const FALLBACK = { name: "Chittagong", country: "Bangladesh", lat: 22.3569, lon: 91.7832 };

function wmo(c){
  if(c===0) return {icon:"☀️",label:"Clear sky"};
  if(c===1) return {icon:"🌤️",label:"Mainly clear"};
  if(c===2) return {icon:"⛅",label:"Partly cloudy"};
  if(c===3) return {icon:"☁️",label:"Overcast"};
  if([45,48].includes(c)) return {icon:"🌫️",label:"Fog"};
  if([51,61,80].includes(c)) return {icon:"🌧️",label:"Light rain"};
  if([63,65,81,82].includes(c)) return {icon:"🌧️",label:"Rain"};
  if(c===95) return {icon:"⛈️",label:"Thunderstorm"};
  return {icon:"☁️",label:"Cloudy"};
}

export default function App(){
  const [loc,setLoc]=useState(FALLBACK);
  const [weather,setWeather]=useState(null);
  const [q,setQ]=useState("");
  const [results,setResults]=useState([]);
  const [isC,setIsC]=useState(true);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(async p=>{
      try{
        const r=await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${p.coords.latitude}&longitude=${p.coords.longitude}&language=en`);
        const j=await r.json();
        if(j.results?.[0]){
          const g=j.results[0];
          setLoc({name:g.name,country:g.country,lat:g.latitude,lon:g.longitude});
        }
      }catch{}
    });
  },[]);

  useEffect(()=>{
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation,uv_index&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`)
   .then(r=>r.json()).then(setWeather);
  },[loc]);

  useEffect(()=>{
    if(q.length<2){setResults([]);return;}
    const t=setTimeout(async()=>{
      const r=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${q}&count=5&language=en&format=json`);
      const j=await r.json();
      setResults(j.results||[]);
    },300);
    return()=>clearTimeout(t);
  },[q]);

  const fmtT=v=>Math.round(isC?v:(v*9)/5+32);

  if(!weather) return <div className="min-h-screen grid place-items-center text-white/50 bg-[#08080a]">Loading AERIS...</div>;

  const cur=weather.current;
  const info=wmo(cur.weather_code);

  return(
    <div className="min-h-screen bg-[#08080a] text-white">
      <div className="max-w- mx-auto px-5 py-6">
        <header className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white text-black grid place-items-center font-bold">A</div>
            <div>
              <div className="font-semibold text- tracking-tight">AERIS</div>
              <div className="text- tracking-[0.2em] text-white/40 -mt-1">WEATHER INTELLIGENCE</div>
            </div>
          </div>
          <div className="flex gap-2 relative w-full md:w-auto">
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search city..." className="w-full md:w- h-11 rounded-full bg-white/[0.07] border border-white/10 px-5 text- outline-none" />
            {results.length>0&&<div className="absolute top- left-0 w-full bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden z-50">{results.map(r=><div key={r.id} onClick={()=>{setLoc({name:r.name,country:r.country,lat:r.latitude,lon:r.longitude});setResults([]);setQ("");}} className="px-4 py-3 hover:bg-white/5 cursor-pointer text-">{r.name}, {r.country}</div>)}</div>}
            <button onClick={()=>setIsC(!isC)} className="h-11 px-5 rounded-full bg-white/[0.08] border border-white/10 text-">{isC?"°C":"°F"}</button>
          </div>
        </header>

        <main className="mt-8 grid md:grid-cols-[1.3fr_.7fr] gap-5">
          <div className="rounded- bg-white/[0.06] border border-white/10 p-8 backdrop-blur-2xl">
            <div className="text- tracking-widest text-white/40">{loc.name.toUpperCase()}, {loc.country.toUpperCase()}</div>
            <div className="text- font-[200] tracking-tighter mt-2">{fmtT(cur.temperature_2m)}°</div>
            <div className="flex items-center gap-2 mt-1"><span className="text-3xl">{info.icon}</span><span className="text-white/70">{info.label}</span><span className="ml-3 px-3 py-1 rounded-full bg-white/10 text-">Feels {fmtT(cur.apparent_temperature)}°</span></div>
            <div className="mt-6 grid grid-cols-3 gap-3 text- text-white/60">
              <div className="rounded-2xl bg-white/5 p-4">Humidity<br/><span className="text-white text-">{cur.relative_humidity_2m}%</span></div>
              <div className="rounded-2xl bg-white/5 p-4">Wind<br/><span className="text-white text-">{cur.wind_speed_10m} km/h</span></div>
              <div className="rounded-2xl bg-white/5 p-4">UV Index<br/><span className="text-white text-">{cur.uv_index}</span></div>
            </div>
          </div>

          <div className="rounded- bg-white/[0.06] border border-white/10 p-6 backdrop-blur-2xl">
            <div className="text- tracking-widest text-white/40">7-DAY</div>
            <div className="mt-4">
              {weather.daily.time.map((d,i)=><div key={d} className="flex justify-between py-3 border-b border-white/5 last:border-0">
                <span className="text- text-white/50 w-">{i===0?"Today":new Date(d).toLocaleDateString([],{weekday:"short"})}</span>
                <span>{wmo(weather.daily.weather_code[i]).icon}</span>
                <span className="text-">{fmtT(weather.daily.temperature_2m_max[i])}° <span className="text-white/40">{fmtT(weather.daily.temperature_2m_min[i])}°</span></span>
              </div>)}
            </div>
          </div>
        </main>

        <div className="mt-5 rounded- bg-white/[0.05] border border-white/10 p-6">
          <div className="text- tracking-widest text-white/40 mb-4">NEXT 24 HOURS</div>
          <div className="flex gap-3 overflow-x-auto">
            {weather.hourly.time.slice(0,24).map((t,i)=><div key={t} className="min-w- rounded-2xl bg-white/5 border border-white/10 p-3 text-center">
              <div className="text- text-white/40">{new Date(t).toLocaleTimeString([],{hour:"2-digit"})}</div>
              <div className="text-lg mt-1">{wmo(weather.hourly.weather_code[i]).icon}</div>
              <div className="text- mt-1">{fmtT(weather.hourly.temperature_2m[i])}°</div>
            </div>)}
          </div>
        </div>

        <footer className="mt-6 text- text-white/30">AERIS • No API key • Open-Meteo</footer>
      </div>
    </div>
  );
}