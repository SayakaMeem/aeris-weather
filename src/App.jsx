import { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { db } from './db.js';
import Home from './pages/Home.jsx';
import HistoryPage from './pages/History.jsx';
import Future from './pages/Future.jsx';

const FALLBACK = { name: "Chittagong", country: "Bangladesh", lat: 22.3569, lon: 91.7832 };

export default function App(){
  const [loc,setLoc]=useState(FALLBACK);
  const [weather,setWeather]=useState(null);
  const [q,setQ]=useState("");
  const [results,setResults]=useState([]);
  const [isC,setIsC]=useState(true);
  const location = useLocation();
  const navigate = useNavigate();

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
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation,uv_index&hourly=temperature_2m,weather_code,precipitation_probability,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,uv_index_max&timezone=auto&forecast_days=14`)
   .then(r=>r.json()).then(setWeather);
  },[loc]);

  useEffect(()=>{
    if(q.length<2){setResults([]);return;}
    const t=setTimeout(async()=>{
      const r=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${q}&count=6&language=en&format=json`);
      const j=await r.json();
      setResults(j.results||[]);
    },300);
    return()=>clearTimeout(t);
  },[q]);

  const selectCity=(city)=>{
    const newLoc={name:city.name,country:city.country,lat:city.latitude,lon:city.longitude};
    setLoc(newLoc);
    db.addSearch(newLoc);
    setResults([]);
    setQ("");
    navigate('/');
  };

  const NavLink = ({to,children}) => {
    const active = location.pathname===to;
    return <Link to={to} className={`px-5 py-2.5 rounded-full text- border transition ${active?'bg-white text-black border-white':'bg-white/10 border-white/10 text-white/70 hover:bg-white/15'}`}>{children}</Link>
  };

  return(
    <div className="min-h-screen bg-[#08080a] text-white">
      <div className="max-w- mx-auto px-5 py-6">
        <header className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white text-black grid place-items-center font-bold">A</div>
            <div><div className="font-semibold text- tracking-tight">AERIS</div><div className="text- tracking-[0.2em] text-white/40 -mt-1">MULTIPAGE WEATHER OS</div></div>
          </Link>
          <nav className="flex gap-2">
            <NavLink to="/">Today</NavLink>
            <NavLink to="/future">Future (14d)</NavLink>
            <NavLink to="/history">History</NavLink>
          </nav>
          <div className="flex gap-2 relative w-full lg:w-auto">
            <div className="relative w-full lg:w-">
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search any city..." className="w-full h-11 rounded-full bg-white/[0.07] border border-white/10 px-5 text- outline-none focus:border-white/20" />
              {results.length>0 && <div className="absolute top- left-0 w-full bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl">{results.map(r=><div key={r.id} onClick={()=>selectCity(r)} className="px-4 py-3 hover:bg-white/10 cursor-pointer text-">{r.name}, {r.country} - {r.admin1||''}</div>)}</div>}
            </div>
            <button onClick={()=>setIsC(!isC)} className="h-11 px-5 rounded-full bg-white/[0.08] border border-white/10 text-">{isC?"°C":"°F"}</button>
          </div>
        </header>

        <main className="mt-8">
          <Routes>
            <Route path="/" element={<Home loc={loc} weather={weather} isC={isC} />} />
            <Route path="/future" element={<Future weather={weather} isC={isC} />} />
            <Route path="/history" element={<HistoryPage setLoc={(c)=>{setLoc(c); navigate('/');}} />} />
          </Routes>
        </main>

        <footer className="mt-10 text- text-white/30 flex justify-between">
          <span>3 Pages • React Router • Free Open-Meteo JSON API • DB: localStorage • UV fixed</span>
          <span>{loc.name} • {loc.lat.toFixed(2)}, {loc.lon.toFixed(2)}</span>
        </footer>
      </div>
    </div>
  );
}