import React from 'react';

const brands = [
  {
    name: 'Google',
    logo: (
      <span className="font-bold text-slate-700 tracking-tight text-lg flex items-center gap-1.5">
        <span className="text-blue-500 font-black text-xl">G</span>oogle
      </span>
    ),
  },
  {
    name: 'Meta',
    logo: (
      <span className="font-bold text-slate-700 tracking-tight text-lg flex items-center gap-1.5">
        <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.99 7.99C15.01 7.99 13.56 9.07 12 11.23C10.44 9.07 8.99 7.99 7.01 7.99C3.76 7.99 1.5 10.74 1.5 14.18C1.5 17.62 3.76 20.37 7.01 20.37C9.37 20.37 11.02 18.91 12 16.78C12.98 18.91 14.63 20.37 16.99 20.37C20.24 20.37 22.5 17.62 22.5 14.18C22.5 10.74 20.24 7.99 16.99 7.99ZM7.01 18.06C5.07 18.06 3.73 16.32 3.73 14.18C3.73 12.04 5.07 10.3 7.01 10.3C8.75 10.3 10.03 11.69 11.02 13.39C10.02 16.48 8.63 18.06 7.01 18.06ZM16.99 18.06C15.37 18.06 13.98 16.48 12.98 13.39C13.97 11.69 15.25 10.3 16.99 10.3C18.93 10.3 20.27 12.04 20.27 14.18C20.27 16.32 18.93 18.06 16.99 18.06Z" />
        </svg>
        <span>Meta</span>
      </span>
    ),
  },
  {
    name: 'Microsoft',
    logo: (
      <span className="font-semibold text-slate-700 text-lg flex items-center gap-2">
        <span className="grid grid-cols-2 gap-0.5 w-4 h-4">
          <span className="bg-[#f25022] rounded-xs" />
          <span className="bg-[#7fba00] rounded-xs" />
          <span className="bg-[#00a4ef] rounded-xs" />
          <span className="bg-[#ffb900] rounded-xs" />
        </span>
        Microsoft
      </span>
    ),
  },
  {
    name: 'HubSpot',
    logo: (
      <span className="font-bold text-slate-700 text-lg flex items-center gap-1.5">
        <span className="text-[#ff7a59] font-black text-xl">●</span> HubSpot
      </span>
    ),
  },
  {
    name: 'Slack',
    logo: (
      <span className="font-bold text-slate-700 text-lg flex items-center gap-1.5">
        <span className="text-[#e01e5a] text-xl font-black">#</span> slack
      </span>
    ),
  },
  {
    name: 'Notion',
    logo: (
      <span className="font-bold text-slate-700 text-lg flex items-center gap-1.5">
        <span className="border border-slate-700 px-1 text-xs rounded font-mono font-bold">N</span> Notion
      </span>
    ),
  },
];

const TrustedBrands = () => {
  return (
    <section className="py-10 border-y border-slate-100 bg-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Label */}
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider lg:border-r lg:border-slate-200 lg:pr-8 whitespace-nowrap">
            Trusted by <br className="hidden lg:block" />
            <span className="text-slate-700 font-bold">Growing Businesses</span>
          </div>

          {/* Logos row */}
          <div className="flex flex-wrap items-center justify-center lg:justify-between w-full gap-8 sm:gap-12 opacity-85 hover:opacity-100 transition-opacity">
            {brands.map((brand, idx) => (
              <div key={idx} className="grayscale hover:grayscale-0 transition-all hover:scale-105 duration-200">
                {brand.logo}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;

