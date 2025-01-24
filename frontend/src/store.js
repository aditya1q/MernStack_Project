import { create } from 'zustand';
import ls from 'localstorage-slim'

const authstate = ls.get("message") === "login successfully"

const useUserLoggedIn = create((set) => ({
    loggedIn: authstate,
    setLoggedIn: (loggedIn) => set({ loggedIn }),
}));

export { useUserLoggedIn };