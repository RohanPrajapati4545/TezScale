import React from 'react';
import { Phone } from 'lucide-react';
import countryCodes from '../utils/countryCodes';

const PhoneInput = ({
  countryCode,
  setCountryCode,
  phoneNumber,
  setPhoneNumber,
  required = true,
  disabled = false,
  placeholder = '98765 43210',
  id = 'phone-input',
  name = 'phone',
  className = '',
  dark = false,
}) => {
  const handlePhoneKeyDown = (e) => {
    // Allow navigation, deletion, backspace, tab, enter
    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Tab',
      'Enter',
      'Home',
      'End',
    ];
    if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
      return;
    }
    // Block any non-digit character
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePhoneChange = (e) => {
    // Strictly strip out any non-numeric character
    const rawVal = e.target.value;
    const digitsOnly = rawVal.replace(/\D/g, '');
    // Limit to max 14 digits
    setPhoneNumber(digitsOnly.slice(0, 14));
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text');
    const digitsOnly = pasted.replace(/\D/g, '');
    setPhoneNumber(digitsOnly.slice(0, 14));
  };

  return (
    <div className={`relative flex items-center rounded-xl border transition-all overflow-hidden ${
      dark
        ? 'border-slate-700 bg-slate-800/80 focus-within:border-[#00A3E0] focus-within:ring-2 focus-within:ring-[#00A3E0]/40 shadow-inner'
        : 'border-slate-200 bg-slate-50 focus-within:border-[#00A3E0] focus-within:ring-1 focus-within:ring-[#00A3E0]'
    } ${className}`}>
      
      {/* Country Code Select Dropdown */}
      <div className={`relative border-r flex items-center shrink-0 w-[88px] sm:w-[102px] ${
        dark ? 'border-slate-700 bg-slate-800/95' : 'border-slate-200 bg-slate-100/90'
      }`}>
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          disabled={disabled}
          className={`w-full appearance-none pl-2.5 pr-5 py-2.5 bg-transparent text-xs sm:text-sm font-bold cursor-pointer focus:outline-none truncate ${
            dark ? 'text-white' : 'text-slate-800'
          }`}
          title="Select Country Dial Code"
          aria-label="Country Code"
        >
          {countryCodes.map((c, idx) => (
            <option key={`${c.code}-${c.country}-${idx}`} value={c.code} className={dark ? 'bg-slate-900 text-white font-medium' : 'bg-white text-slate-900 font-medium'}>
              {c.flag} {c.code} ({c.country})
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 text-[9px]">
          ▼
        </div>
      </div>

      {/* Digits Only Input */}
      <div className="relative flex-1 flex items-center">
        <Phone className={`w-4 h-4 absolute left-3 pointer-events-none shrink-0 ${
          dark ? 'text-sky-400' : 'text-slate-400'
        }`} />
        <input
          id={id}
          type="tel"
          name={name}
          inputMode="numeric"
          pattern="[0-9]*"
          required={required}
          disabled={disabled}
          value={phoneNumber}
          onKeyDown={handlePhoneKeyDown}
          onChange={handlePhoneChange}
          onPaste={handlePaste}
          placeholder={placeholder}
          className={`w-full pl-9 pr-3.5 py-2.5 bg-transparent text-xs sm:text-sm font-medium focus:outline-none ${
            dark ? 'text-white placeholder:text-slate-400' : 'text-slate-900 placeholder:text-slate-400'
          }`}
        />
      </div>

    </div>
  );
};

export default PhoneInput;
