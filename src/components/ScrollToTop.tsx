import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  //jb bhi route change hoga tab - tab page top pe scroll hoga

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "instant" });
}, [pathname]);

  return null;
};

export default ScrollToTop;
