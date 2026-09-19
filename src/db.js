export const db = {
  getHistory: () => {
    try { return JSON.parse(localStorage.getItem('aeris_history') || '[]'); }
    catch { return []; }
  },
  saveHistory: (h) => localStorage.setItem('aeris_history', JSON.stringify(h)),
  addSearch: (city) => {
    let history = db.getHistory();
    const existing = history.find(x => x.name.toLowerCase() === city.name.toLowerCase());
    if (existing) {
      existing.count += 1;
      existing.lastSearched = new Date().toISOString();
      history = [existing,...history.filter(x => x.name.toLowerCase()!== city.name.toLowerCase())];
    } else {
      history.unshift({...city, count: 1, lastSearched: new Date().toISOString(), id: Date.now() });
    }
    history = history.slice(0, 30);
    db.saveHistory(history);
    return history;
  },
  deleteOne: (id) => {
    let h = db.getHistory().filter(x => x.id!== id);
    db.saveHistory(h);
    return h;
  },
  clearAll: () => {
    localStorage.removeItem('aeris_history');
    return [];
  },
  getMostFrequent: () => {
    const h = db.getHistory();
    return h.length? [...h].sort((a, b) => b.count - a.count)[0] : null;
  }
};

export const wmo = (c) => {
  if (c === 0) return { icon: "☀️", label: "Clear sky" };
  if (c === 1) return { icon: "🌤️", label: "Mainly clear" };
  if (c === 2) return { icon: "⛅", label: "Partly cloudy" };
  if (c === 3) return { icon: "☁️", label: "Overcast" };
  if ([45, 48].includes(c)) return { icon: "🌫️", label: "Fog" };
  if ([51, 53, 55].includes(c)) return { icon: "🌦️", label: "Drizzle" };
  if ([61, 63, 65].includes(c)) return { icon: "🌧️", label: "Rain" };
  if ([80, 81, 82].includes(c)) return { icon: "🌧️", label: "Showers" };
  if ([71, 73, 75, 77, 85, 86].includes(c)) return { icon: "❄️", label: "Snow" };
  if ([95, 96, 99].includes(c)) return { icon: "⛈️", label: "Thunderstorm" };
  return { icon: "☁️", label: "Cloudy" };
};