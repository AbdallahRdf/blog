import { useEffect, useState } from 'react'

const useDarkMode = () => {

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const theme = localStorage.getItem('theme');
        if (theme)
            return theme === "dark";
        return true;
    })

    // store theme option in local storage (dark or light)
    useEffect(() => localStorage.setItem("theme", isDarkMode ? "dark" : "light"), [isDarkMode]);

    // toggle the 'dark' class in the #root element.
    useEffect(() => {
        if (isDarkMode) {
            document.querySelector("#root").classList.add('dark');
        } else {
            document.querySelector("#root").classList.remove('dark');
        }
    }, [isDarkMode]);

    return [isDarkMode, setIsDarkMode];
}

export default useDarkMode;