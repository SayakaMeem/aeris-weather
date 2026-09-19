import { useEffect, useState } from 'react';
import { db } from '../db.js';

export default function History({ setLoc }){
  const [history,setHistory]=useState([]);
  const [mostFreq,setMostFreq]=useState(null);

  useEffect(()=>{
    setHistory(db.getHistory());
    setMostFreq(db.getMostFrequent());
  },[]);

  const del=(id)=>{
    const h=db.deleteOne(id);
    setHistory(h);
    setMostFreq(db.getMostFrequent());
  };

  const clear=()=>{
    db.clearAll();
    setHistory([]);
    setMostFreq(null);
  };

  return (
    <div className="space-y-5">
      <div className="rounded- bg-white/[0.06] border border-white/10 p-8">
        <div className="flex justify-between items-center">
          <h2 className="text- font-medium tracking-tight">Recent Search History</h2>
          <button onClick={clear} className="px-4 py-2 rounded-full bg-red-500/20 text-red-300 text- border border-red-500/20 hover:bg-red-500/30">Clear All</button>
        </div>

        {mostFreq && (
          <div className="mt-4 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-">
            ⭐ Most Frequent: <b>{mostFreq.name}, {mostFreq.country}</b> — {mostFreq.count} searches • Last: {new Date(mostFreq.lastSearched).toLocaleString()}
          </div>
        )}

        <div className="mt-6 grid gap-2">
          {history.length===0 && <div className="text-white/40 text- py-16 text-center border border-dashed border-white/10 rounded-2xl">No history yet. Search a city on Today page. Your searches will be stored in localStorage JSON database.</div>}
          {history.map(h=>(
            <div key={h.id} className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.06] transition group">
              <div className="cursor-pointer flex-1" onClick={()=>setLoc(h)}>
                <div className="font-medium text-">{h.name}, {h.country}</div>
                <div className="text- text-white/40 mt-1">{h.count} searches • {new Date(h.lastSearched).toLocaleString()} • Lat {h.lat.toFixed(2)}, Lon {h.lon.toFixed(2)}</div>
              </div>
              <button onClick={()=>del(h.id)} className="h-9 w-9 rounded-full bg-white/10 grid place-items-center text- hover:bg-red-500/30 transition opacity-0 group-hover:opacity-100">✕</button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded- bg-white/[0.03] border border-white/10 p-6 text- text-white/30 leading-relaxed">
        <div className="grid md:grid-cols-3 gap-4">
          <div><b className="text-white/50">Database:</b> localStorage JSON</div>
          <div><b className="text-white/50">Total:</b> {history.length} cities</div>
          <div><b className="text-white/50">Storage:</b> Browser only, no backend</div>
        </div>
        <div className="mt-3">APIs: geocoding-api.open-meteo.com/v1/search + api.open-meteo.com/v1/forecast • Free • No API key • You can delete single item with ✕ or Clear All</div>
      </div>
    </div>
  )
}