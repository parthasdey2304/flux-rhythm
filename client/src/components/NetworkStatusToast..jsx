import React, { useState, useEffect } from "react";
import Toast from "./Toast";

const NetworkStatusToast = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setMessage("You are back online.");
            setShowToast(true);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setMessage("You are offline.");
            setShowToast(true);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        showToast && (
            <Toast message={message} onClose={() => setShowToast(false)} />
        )
    );
};

export default NetworkStatusToast;
