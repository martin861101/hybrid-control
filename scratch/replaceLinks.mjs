import fs from 'fs';

const files = [
  'src/components/layout/Header.tsx',
  'src/pages/Home.tsx',
  'src/pages/InnerPage.tsx',
  'src/pages/ProjectsPage.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Replace <Link ... to="/contact">...<ArrowRight/></Link> with <button ... onClick={...}>...<ArrowRight/></button>
  content = content.replace(
    /<Link([^>]*)to="\/contact"([^>]*)>(.*?)<\/Link>/g,
    `<button$1onClick={() => window.dispatchEvent(new Event('open-hybrid-chat'))}$2>$3</button>`
  );

  fs.writeFileSync(file, content, 'utf-8');
});
