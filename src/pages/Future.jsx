import { wmo } from '../db.js'

export default function Future({ weather, isC }){
  const fmtT=v=>Math.round(isC?v:(v*9)/5+32);
  if(!weather) return <div className="p-20 text-white/50">Loading future prediction...</div>;

  return (
    <div className="space-y-5">
      <div className="rounded- bg-gradient-to-br from-violet-500/20 via-white/[0.05] to-blue-500/20 border border-white/10 p-8">
        <h2 className="text- font-medium tracking-tight">Future Prediction • 14 Days Forecast</h2>
        <p className="text- text-white/50 mt-1">Powered by Open-Meteo Future Forecast API (free JSON) • Daily UV Max + Rain Probability • Updated hourly</p>

        <div className="mt-6 grid md:grid-cols-2 gap-3">
          {weather.daily.time.map((d,i)=>(
            <div key={d} className="rounded- bg-black/30 border border-white/10 p-5 flex justify-between items-center backdrop-blur">
              <div className="flex-1">
                <div className="text- text-white/50 uppercase tracking-widest">{i===0?"Today":new Date(d).toLocaleDateString([],{weekday:"long", month:"short", day:"numeric"})}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl">{wmo(weather.daily.weather_code[i]).icon}</span>
                  <span className="text- text-white/80">{wmo(weather.daily.weather_code[i]).label}</span>
                </div>
                <div className="text- text-white/40 mt-2 leading-relaxed">
                  Sunrise {new Date(weather.daily.sunrise[i]).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})} • Sunset {new Date(weather.daily.sunset[i]).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}<br/>
                  Rain {weather.daily.precipitation_probability_max[i]}% • UV Max {weather.daily.uv_index_max[i]}
                </div>
              </div>
              <div className="text-right ml-4">
                <div className="text- font-[200] leading-none">{fmtT(weather.daily.temperature_2m_max[i])}°</div>
                <div className="text- text-white/40 mt-1">{fmtT(weather.daily.temperature_2m_min[i])}°</div>
                <div className="mt-3 h-1.5 w- rounded-full bg-white/10 overflow-hidden ml-auto">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-orange-400" style={{width:`${weather.daily.precipitation_probability_max[i]}%`}}></div>
                </div>
                <div className="text- text-white/30 mt-1">RAIN PROB</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded- bg-white/[0.04] border border-white/10 p-6">
        <div className="text- tracking-widest text-white/40">14-DAY UV TREND</div>
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {weather.daily.time.map((d,i)=>(
            <div key={d} className="min-w- text-center">
              <div className="text- text-white/40">{new Date(d).toLocaleDateString([],{weekday:"short"})}</div>
              <div className="mt-2 h- w-full rounded-full bg-white/5 border border-white/10 relative overflow-hidden flex items-end justify-center pb-1">
                <div className="w-full bg-gradient-to-t from-green-500 via-yellow-400 to-red-500" style={{height: `${(weather.daily.uv_index_max[i]/12)*100}%`}}></div>
              </div>
              <div className="text- mt-1">{weather.daily.uv_index_max[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}