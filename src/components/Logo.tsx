export function ReverieLogo() {
  return (
    <div className="flex flex-col items-center ">
      {/* Main logo text */}
      <div className="text-center">
        <h1 className="text-7xl tracking-widest relative font-hand">
          <span className="relative inline-block">R</span>
          everie
        </h1>

        {/* Decorative underline */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-ink-brown/20" />
          <div className="w-2 h-2 rounded-full bg-coffee-light/50" />
          <div className="h-px w-16 bg-ink-brown/30" />
          <div className="w-2 h-2 rounded-full bg-coffee-light/50" />
          <div className="h-px w-10 bg-ink-brown/20" />
        </div>

        {/* Slogan */}
        <p className="tracking-[0.4em] uppercase opacity-80 font-crimson">
          Every mood has a page
        </p>
      </div>

      {/* Decorative bottom flourish */}
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-coffee-light/40" />
        <div className="h-px w-8 bg-ink-brown/20" />
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          className="text-coffee-light/50"
        >
          <circle cx="8" cy="8" r="2.5" fill="currentColor" />
          <circle cx="8" cy="2" r="1.5" fill="currentColor" />
          <circle cx="8" cy="14" r="1.5" fill="currentColor" />
          <circle cx="2" cy="8" r="1.5" fill="currentColor" />
          <circle cx="14" cy="8" r="1.5" fill="currentColor" />
        </svg>
        <div className="h-px w-8 bg-ink-brown/20" />
        <div className="w-2 h-2 rounded-full bg-coffee-light/40" />
      </div>
    </div>
  );
}
