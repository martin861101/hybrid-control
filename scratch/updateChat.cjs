const fs = require('fs');

let content = fs.readFileSync('src/components/chat/HybridChat.tsx', 'utf-8');

if (!content.includes('open-hybrid-chat')) {
  content = content.replace(
    '  useEffect(() => {\n    function handleKeyDown(e: KeyboardEvent) {',
    `  useEffect(() => {
    function handleOpenEvent() {
      setIsOpen(true);
    }
    window.addEventListener('open-hybrid-chat', handleOpenEvent);
    return () => window.removeEventListener('open-hybrid-chat', handleOpenEvent);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {`
  );
  fs.writeFileSync('src/components/chat/HybridChat.tsx', content, 'utf-8');
}
