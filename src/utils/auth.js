const KEY = "sp_session";
export const getSession = () => { try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; } };
export const login = (role) => localStorage.setItem(KEY, JSON.stringify({ role }));
export const logout = () => localStorage.removeItem(KEY);

export const DEMO = {
  student: { email: "ayesha@studypilot.demo", password: "fly1234" },
  parent: { email: "parent@studypilot.demo", password: "fly1234" },
};
export const PARENT_PIN = "1234";