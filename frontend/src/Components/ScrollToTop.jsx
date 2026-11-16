import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      let attempts = 0;
      const scrollToTarget = () => {
        const element = document.getElementById(id);
        if (element) {
          const navHeight = 80;
          const targetY = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        } else if (attempts < 15) {
          attempts++;
          setTimeout(scrollToTarget, 100);
        }
      };
      // Allow DOM mount before scrolling to hash target
      const timer = setTimeout(scrollToTarget, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;

