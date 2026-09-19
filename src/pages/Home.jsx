import { wmo } from '../db.js'

export default function Home({ loc, weather, isC }){
  const fmtT=v=>Math.round(isC?v:(v*9)/5+32);
  if(!weather) return <div className="p-20 text-white/50">Loading weather...</div>;
  const cur=weather.current;
  const todayUvMax = weather.daily.uv_index_max[0];

  const getUvColor = (uv) => {
    if(uv <= 2) return "bg-green-500";
    if(uv <= 5) return "bg-yellow-400";
    if(uv <= 7) return "bg-orange-500";
    if(uv <= 10) return "bg-red-500";
    return "bg-purple-600";
  };

  return (
    <div className="space-y-5">
      <div className="rounded- bg-white/[0.06] border border-white/10 p-8 backdrop-blur-2xl">
        <div className="flex justify-between">
          <div className="text- tracking-widest text-white/40">{loc.name.toUpperCase()}, {loc.country.toUpperCase()} • LIVE JSON API • {weather.timezone}</div>
          <div className="text- px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300">LIVE</div>
        </div>
        <div className="text- font-[200] tracking-tighter mt-2 leading-none">{fmtT(cur.temperature_2m)}°<span className="text- text-white/40 font-light ml-2">{isC?"C":"F"}</span></div>
        <div className="flex items-center gap-3 mt-4">
          <span className="text-4xl">{wmo(cur.weather_code).icon}</span>
          <div>
            <div className="text-white/80 text-">{wmo(cur.weather_code).label}</div>
            <div className="text- text-white/40">Feels like {fmtT(cur.apparent_temperature)}° • Humidity {cur.relative_humidity_2m}% • Wind {cur.wind_speed_10m} km/h</div>
          </div>
          <span className="ml-3 px-3 py-1 rounded-full bg-white/10 text-">Feels {fmtT(cur.apparent_temperature)}°</span>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
            <div className="text- text-white/40">HUMIDITY</div>
            <div className="text- mt-1 font-light">{cur.relative_humidity_2m}%</div>
          </div>
          <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
            <div className="text- text-white/40">WIND</div>
            <div className="text- mt-1 font-light">{cur.wind_speed_10m} km/h</div>
          </div>
          <div className="rounded-2xl bg-white/5 p-4 border border-white/5 relative overflow-hidden">
            <div className="text- text-white/40">UV INDEX • NOW / MAX</div>
            <div className="text- mt-1 font-light">{cur.uv_index} <span className="text-white/40 text-">/ {todayUvMax}</span></div>
            <div className="text- text-white/30 mt-1">{cur.uv_index === 0? "Night - no sun" : cur.uv_index < 3? "Low" : cur.uv_index < 6? "Moderate" : "High - protection needed"}</div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div className={`h-full ${getUvColor(cur.uv_index)} transition-all`} style={{width: `${Math.min((cur.uv_index/11)*100,100)}%`}}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded- bg-white/[0.05] border border-white/10 p-6">
        <div className="flex justify-between mb-4">
          <span className="text- tracking-widest text-white/40">NEXT 24 HOURS - HOURLY JSON</span>
          <span className="text- text-white/30">UV changes hourly with sun</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {weather.hourly.time.slice(0,24).map((t,i)=>(
            <div key={t} className="min-w- rounded-2xl bg-white/5 border border-white/10 p-3 text-center">
              <div className="text- text-white/40">{new Date(t).toLocaleTimeString([],{hour:"2-digit"})}</div>
              <div className="text-xl mt-1">{wmo(weather.hourly.weather_code[i]).icon}</div>
              <div className="text- mt-1">{fmtT(weather.hourly.temperature_2m[i])}°</div>
              <div className="text- mt-1 px-1.5 py-0.5 rounded-full bg-white/10">UV {weather.hourly.uv_index[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}