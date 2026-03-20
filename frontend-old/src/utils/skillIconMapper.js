import techStackData from '../data/techStack.json';

const skillIconMap = {
  'Python': 'Python',
  'Django': 'Django',
  'Django ORM': 'Django',
  'Flask': 'Flask',
  'FastAPI': 'FastAPI',
  'React': 'React',
  'Vite': 'Vite',
  'Tailwind': 'Tailwind',
  'HTML': 'HTML5',
  'HTML5': 'HTML5',
  'CSS': 'CSS3',
  'CSS3': 'CSS3',
  'SCSS': 'SCSS',
  'Swagger': 'Swagger',
  'Swagger/OpenAPI': 'Swagger',
  'AWS (EC2, S3, CodePipeline, CodeDeploy)': 'AWS',
  'AWS': 'AWS',
  'AWS Bedrock': 'AWS',
  'Docker': 'Docker',
  'Docker Compose': 'Docker',
  'Linux': 'Linux',
  'Ubuntu': 'Ubuntu',
  'Fedora': 'Fedora',
  'VS Code': 'VS Code',
  'Cursor IDE': 'Cursor IDE',
  'Terminal': 'Terminal',
  'Git': 'Git',
  'GitHub': 'GitHub Codespaces',
  'GitHub Actions': 'GitHub Codespaces',
  'GitHub Codespaces': 'GitHub Codespaces',
  'GitLab': 'GitLab',
  'Apache': 'Apache',
  'PostgreSQL': 'PostgreSQL',
  'MySQL': 'MySQL',
  'SQLite': 'SQLite',
  'Redis': 'Redis',
  'Postman': 'Postman',
  'Pytest': 'Pytest',
  'Celery': 'Celery',
  'Azure APIs': 'Azure APIs',
  'PyTorch': 'PyTorch',
  'Jupyter': 'Jupyter',
  'Grafana': 'Grafana',
  'Prometheus': 'Prometheus',
  'Python Telegram Bot': 'Python-telegram-bot',
  'Python-telegram-bot': 'Python-telegram-bot',
  'YoloV8': 'YoloV8',
  'Jira': 'Jira',
  'Stripe': 'Stripe',
  'Trello': 'Trello'
};

export const getSkillIcon = (skillName) => {
  const mappedName = skillIconMap[skillName];
  if (!mappedName) return null;
  
  const tech = techStackData.find(
    tech => tech.name === mappedName
  );
  
  return tech ? tech.img : null;
};

export default getSkillIcon;