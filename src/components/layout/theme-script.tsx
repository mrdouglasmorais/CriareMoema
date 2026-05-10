/**
 * Script inline injetado no <head> antes da hidratação do React.
 * Lê localStorage e prefers-color-scheme para aplicar a classe 'dark'
 * no <html> sem flash (FOUC) durante o carregamento.
 */
export function ThemeScript() {
  const script = `(function(){try{var s=localStorage.getItem('theme'),m=window.matchMedia('(prefers-color-scheme:dark)').matches,d=s==='dark'||(s!=='light'&&m);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
