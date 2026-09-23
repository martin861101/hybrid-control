const fs = require('fs');

const files = [
  'src/pages/InnerPage.tsx',
  'src/pages/ProjectsPage.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  if (!content.includes("import BlurText")) {
    // Add import after the last import
    const lastImportIndex = content.lastIndexOf("import ");
    const newlineIndex = content.indexOf("\n", lastImportIndex);
    content = content.slice(0, newlineIndex + 1) + "import BlurText from '../components/BlurText'\n" + content.slice(newlineIndex + 1);
  }

  // Replace <h1>{...}</h1> that has split logic (which InnerPage has)
  // Actually, InnerPage has dynamic h1. Let's just do static H2s and H3s for now as an approximation.
  
  // Let's replace any plain text in <h2>...</h2>
  content = content.replace(/<h2>([^<]+)<\/h2>/g, '<h2><BlurText text="$1" /></h2>');
  
  // Let's replace any plain text in <h3>...</h3>
  content = content.replace(/<h3>([^<]+)<\/h3>/g, '<h3><BlurText text="$1" /></h3>');
  
  // Replace ones with <br/> or <em> manually like we did for Home:
  content = content.replace(/<h2>Certified systems\.<br\/><em>Proven ecosystems\.<\/em><\/h2>/, '<h2><BlurText text="Certified systems." /><br/><em><BlurText text="Proven ecosystems." delay={300} /></em></h2>');
  content = content.replace(/<h2>Understand what each capability does,<br\/><em>when it applies and how it connects\.<\/em><\/h2>/, '<h2><BlurText text="Understand what each capability does," /><br/><em><BlurText text="when it applies and how it connects." delay={300} /></em></h2>');
  content = content.replace(/<h2>Hybrid Control understands<br\/><em>your operating context\.<\/em><\/h2>/, '<h2><BlurText text="Hybrid Control understands" /><br/><em><BlurText text="your operating context." delay={300} /></em></h2>');
  content = content.replace(/<h2>Products are components\.<br\/><em>Systems are the outcome\.<\/em><\/h2>/, '<h2><BlurText text="Products are components." /><br/><em><BlurText text="Systems are the outcome." delay={300} /></em></h2>');
  content = content.replace(/<h2>Insights from the<br\/><em>operational edge\.<\/em><\/h2>/, '<h2><BlurText text="Insights from the" /><br/><em><BlurText text="operational edge." delay={300} /></em></h2>');
  content = content.replace(/<h2>Industrial data,<br\/><em>made operational\.<\/em><\/h2>/, '<h2><BlurText text="Industrial data," /><br/><em><BlurText text="made operational." delay={300} /></em></h2>');
  content = content.replace(/<h2>Five connected business units,<br\/><em>one integrated system\.<\/em><\/h2>/, '<h2><BlurText text="Five connected business units," /><br/><em><BlurText text="one integrated system." delay={300} /></em></h2>');
  content = content.replace(/<h2>From field signal<br\/><em>to operational decision\.<\/em><\/h2>/, '<h2><BlurText text="From field signal" /><br/><em><BlurText text="to operational decision." delay={300} /></em></h2>');
  content = content.replace(/<h2>Technology is only valuable<br\/><em>when it solves the right problem\.<\/em><\/h2>/, '<h2><BlurText text="Technology is only valuable" /><br/><em><BlurText text="when it solves the right problem." delay={300} /></em></h2>');
  
  // InnerPage H1
  content = content.replace(/<h1>Bring us your<br \/>engineering challenge<em>\.<\/em><\/h1>/, '<h1><BlurText text="Bring us your" /><br /><BlurText text="engineering challenge" delay={300} /><em>.</em></h1>');

  // ProjectsPage headings
  content = content.replace(/<h1>Engineering<br\/><em>in motion\.<\/em><\/h1>/, '<h1><BlurText text="Engineering" /><br/><em><BlurText text="in motion." delay={300} /></em></h1>');
  
  // ERWAT heading that might have been changed to not use BlurText yet:
  content = content.replace(/<h2 id="erwat-network-title">ERWAT HQ network<br \/><em>in motion\.<\/em><\/h2>/, '<h2 id="erwat-network-title"><BlurText text="ERWAT HQ network" /><br /><em><BlurText text="in motion." delay={300} /></em></h2>');
  content = content.replace(/<h2 id="midmar-works-title">Midmar Water Treatment<br \/><em>Works\.<\/em><\/h2>/, '<h2 id="midmar-works-title"><BlurText text="Midmar Water Treatment" /><br /><em><BlurText text="Works." delay={300} /></em></h2>');

  fs.writeFileSync(file, content, 'utf-8');
});
