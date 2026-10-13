const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };

export const getPlan = () => read("sp_plan", []);
export const savePlan = (p) => localStorage.setItem("sp_plan", JSON.stringify(p));

export const getXp = () => read("sp_xp", 1240);
export const addXp = (n) => localStorage.setItem("sp_xp", JSON.stringify(getXp() + n));

export const ranks = [["Cadet", 0], ["Pilot 1", 500], ["Pilot 2", 1000], ["Senior Pilot", 2000], ["Captain", 5000]];
export const rankOf = (xp) => {
  let i = 0;
  ranks.forEach(([, min], idx) => { if (xp >= min) i = idx; });
  return { cur: ranks[i][0], next: ranks[i + 1] || null };
};