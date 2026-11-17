import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedCounter Component
 * Triggers a fast, smooth count-up animation when scrolled into view (IntersectionObserver).
 * Correctly parses prefixes, decimals, and suffixes (e.g., '250%', '500+', '5+', '+250%', '4.8x').
 */
const AnimatedCounter = ({ value = '0', duration = 1400, className = '' }) => {
  const [displayValue, setDisplayValue] = useState(() => {
    // Initial display: show 0 with matching prefix/suffix
    const str = String(value);
    const match = str.match(/^([^\d.]*)(\d+(?:\.\d+)?)(.*)$/);
    if (match) {
      const [, prefix, numStr, suffix] = match;
      const initialZero = numStr.includes('.') ? '0.0' : '0';
      return `${prefix}${initialZero}${suffix}`;
    }
    return str;
  });

  const domRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const node = domRef.current;
    if (!node) return;

    const str = String(value).trim();
    const match = str.match(/^([^\d.]*)(\d+(?:\.\d+)?)(.*)$/);

    if (!match) {
      setDisplayValue(str);
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const targetNum = parseFloat(numStr);
    const hasDecimal = numStr.includes('.');
    const decimalPlaces = hasDecimal ? numStr.split('.')[1].length : 0;

    // Fast, responsive IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            let startTimestamp = null;

            const step = (timestamp) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);

              // Ease-out cubic: fast snappy start, smooth silky landing
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              const currentNum = easeProgress * targetNum;

              let formatted;
              if (progress >= 1) {
                formatted = hasDecimal ? targetNum.toFixed(decimalPlaces) : Math.round(targetNum);
              } else {
                formatted = hasDecimal ? currentNum.toFixed(decimalPlaces) : Math.floor(currentNum);
              }

              setDisplayValue(`${prefix}${formatted}${suffix}`);

              if (progress < 1) {
                window.requestAnimationFrame(step);
              }
            };

            window.requestAnimationFrame(step);
            observer.unobserve(node);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={domRef} className={className}>
      {displayValue}
    </span>
  );
};

export default AnimatedCounter;
