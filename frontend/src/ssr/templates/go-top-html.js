export function renderGoToTopHtml() {
  return `
    <button type="button" id="ssr-go-to-top" class="go-to-top-button fixed bottom-4 right-4 sm:bottom-6 sm:right-6 xl:right-36 z-50 flex items-center justify-center
                 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl
                 border border-white/25
                 hover:bg-white/20 hover:border-white/45
                 transition-all duration-300
                 cursor-pointer overflow-hidden group" style="box-shadow:var(--liquid-shadow);opacity:0;pointer-events:none" aria-label="Scroll to top">
      <svg class="go-top-arrow w-4 h-4 sm:w-5 sm:h-5 text-white/90 absolute z-10 transition-colors duration-300 group-hover:text-white" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
      <span class="go-top-w text-lg sm:text-xl font-bold text-white/90 absolute z-10 transition-colors duration-300 group-hover:text-white" style="visibility:hidden;opacity:0">W</span>
    </button>
  `;
}
