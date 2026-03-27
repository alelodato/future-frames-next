"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CookieConsentContext = createContext(null);

export function CookieConsentProvider({ children }) {
    const [consent, setConsent] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("cookie-consent");
        if (saved) setConsent(saved);
        setLoaded(true);
    }, []);

    function accept() {
        localStorage.setItem("cookie-consent", "accepted");
        setConsent("accepted");
    }

    function reject() {
        localStorage.setItem("cookie-consent", "rejected");
        setConsent("rejected");
    }

    return (
        <CookieConsentContext.Provider value={{ consent, accept, reject, loaded }}>
            {children}
        </CookieConsentContext.Provider>
    );
}

export function useCookieConsent() {
    return useContext(CookieConsentContext);
}