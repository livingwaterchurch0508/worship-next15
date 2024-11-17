"use client";

import { useEffect } from "react";

const PreventBackNavigation = () => {
  useEffect(() => {
    history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
};

export default PreventBackNavigation;
