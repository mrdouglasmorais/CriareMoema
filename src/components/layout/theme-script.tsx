/**
 * Garante que a classe 'dark' esteja no <html> antes da hidratação.
 * Não há alternância de tema — o site é sempre dark-mode.
 */
export function ThemeScript() {
  const script = `document.documentElement.classList.add('dark');`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
