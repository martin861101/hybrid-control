const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

// Replace H1
content = content.replace(
  /<motion\.h1[^>]*>Engineering<br \/><em>intelligence<\/em> into<br \/>critical infrastructure\.<\/motion\.h1>/,
  `<h1><BlurText text="Engineering" /><br /><em><BlurText text="intelligence" delay={300} /></em> <BlurText text="into" delay={450} /><br /><BlurText text="critical infrastructure." delay={600} /></h1>`
);

// Replace h2s
content = content.replace(
  /<h2>Technology is only valuable<br \/>when it solves the <em>right problem\.<\/em><\/h2>/,
  `<h2><BlurText text="Technology is only valuable" /><br />when it solves the <em><BlurText text="right problem." delay={400} /></em></h2>`
);

content = content.replace(
  /<h2>Integrated capability,<br \/><em>from concept to operation\.<\/em><\/h2>/,
  `<h2><BlurText text="Integrated capability," /><br /><em><BlurText text="from concept to operation." delay={300} /></em></h2>`
);

content = content.replace(
  /<h2>From remote assets<br \/>to <em>actionable intelligence\.<\/em><\/h2>/,
  `<h2><BlurText text="From remote assets" /><br />to <em><BlurText text="actionable intelligence." delay={300} /></em></h2>`
);

content = content.replace(
  /<h2>Control the process\.<br \/><em>Understand the business\.<\/em><\/h2>/,
  `<h2><BlurText text="Control the process." /><br /><em><BlurText text="Understand the business." delay={300} /></em></h2>`
);

content = content.replace(
  /<h2 className="industries-landing-title">\s*Built for the environments<br \/>\s*that <em>cannot stand still\.<\/em>\s*<\/h2>/,
  `<h2 className="industries-landing-title"><BlurText text="Built for the environments" /><br />that <em><BlurText text="cannot stand still." delay={400} /></em></h2>`
);

content = content.replace(
  /<h2>This is what integrated<br\/><em>engineering looks like\.<\/em><\/h2>/,
  `<h2><BlurText text="This is what integrated" /><br/><em><BlurText text="engineering looks like." delay={300} /></em></h2>`
);

content = content.replace(
  /<h2>One connected process\.<br \/><em>Zero handover gaps\.<\/em><\/h2>/,
  `<h2><BlurText text="One connected process." /><br /><em><BlurText text="Zero handover gaps." delay={400} /></em></h2>`
);

content = content.replace(
  /<h2>Field-ready products,<br \/><em>engineered into solutions\.<\/em><\/h2>/,
  `<h2><BlurText text="Field-ready products," /><br /><em><BlurText text="engineered into solutions." delay={300} /></em></h2>`
);

content = content.replace(
  /<h2>Partnerships built around<br \/><em>proven industrial platforms\.<\/em><\/h2>/,
  `<h2><BlurText text="Partnerships built around" /><br /><em><BlurText text="proven industrial platforms." delay={400} /></em></h2>`
);

content = content.replace(
  /<h2 id="certifications-title">Our certifications &<br \/><em>commitment to excellence\.<\/em><\/h2>/,
  `<h2 id="certifications-title"><BlurText text="Our certifications &" /><br /><em><BlurText text="commitment to excellence." delay={300} /></em></h2>`
);

content = content.replace(
  /<h2>Have an engineering challenge\?<br \/><em>Let’s solve it\.<\/em><\/h2>/,
  `<h2><BlurText text="Have an engineering challenge?" /><br /><em><BlurText text="Let’s solve it." delay={400} /></em></h2>`
);

// Replace h3s
content = content.replace(/<h3>\{unit\.title\}<\/h3>/g, `<h3><BlurText text={unit.title} /></h3>`);
content = content.replace(/<h3>\{item\.title\}<\/h3>/g, `<h3><BlurText text={item.title} /></h3>`);
content = content.replace(/<h3>\{solution\.title\}<\/h3>/g, `<h3><BlurText text={solution.title} /></h3>`);
content = content.replace(/<h3>\{projects\[1\]\.title\}<\/h3>/g, `<h3><BlurText text={projects[1].title} /></h3>`);
content = content.replace(/<h3>\{project\.title\}<\/h3>/g, `<h3><BlurText text={project.title} /></h3>`);
content = content.replace(/<h3>\{title\}<\/h3>/g, `<h3><BlurText text={title} /></h3>`);
content = content.replace(/<h3>\{name\}<\/h3>/g, `<h3><BlurText text={name} /></h3>`);

content = content.replace(
  /<h3>Engineering progress<br \/>beyond infrastructure\.<\/h3>/,
  `<h3><BlurText text="Engineering progress" /><br /><BlurText text="beyond infrastructure." delay={300} /></h3>`
);

content = content.replace(
  /<h3>Standards reflected in<br \/>the way we work\.<\/h3>/,
  `<h3><BlurText text="Standards reflected in" /><br /><BlurText text="the way we work." delay={300} /></h3>`
);

fs.writeFileSync('src/pages/Home.tsx', content, 'utf-8');
