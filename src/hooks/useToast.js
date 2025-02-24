import { useContext, useRef } from "react";
import { toast } from "react-toastify";
import { ThemeContext } from "../context/contexts";

/**
 * Custom hook to display toast notifications.
 * 
 * @returns {Object} An object containing the showToast function.
 */
const useToast = () => {
    const { isDarkMode } = useContext(ThemeContext);

    const toastIdRef = useRef(null);

    /**
     * Displays a toast notification with the specified message and options.
     * 
     * @param {string} message - The message to display in the toast.
     * @param {Function} [toastFn=toast] - The toast function to use for displaying the message.
     * @param {Object} [options={}] - Additional options for the toast notification.
     */
    const showToast = (message, toastFn = toast, options = {}) => {
        toast.dismiss(toastIdRef.current);
        toast.clearWaitingQueue();
        toastIdRef.current = toastFn(message, {
            theme: isDarkMode ? "dark" : "light",
            pauseOnFocusLoss: false,
            autoClose: 15000,
            ...options
        });
    }

    return { showToast }
}

export default useToast;