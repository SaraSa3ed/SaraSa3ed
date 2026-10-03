const featuredProjects = [
  {
    name: 'cafe-restaurant-hub',
    description: 'Restaurant management platform with menu systems, order tracking, and business operations.',
    language: 'TypeScript',
    html_url: 'https://github.com/MahmoudSaberbrisha/cafe-restaurant-hub',
    homepage: ''
  },
  {
    name: 'motor-match-system',
    description: 'Vehicle matching and automotive services platform designed for smart filtering and user flow optimization.',
    language: 'TypeScript',
    html_url: 'https://github.com/MahmoudSaberbrisha/motor-match-system',
    homepage: ''
  },
  {
    name: 'car-branch-manager',
    description: 'Multi-branch dealership management solution for inventory, operations, and branch coordination.',
    language: 'TypeScript',
    html_url: 'https://github.com/MahmoudSaberbrisha/car-branch-manager',
    homepage: ''
  },
  {
    name: 'sig-auto-showcase',
    description: 'Premium automotive showcase built with modern frontend patterns and interactive presentation layers.',
    language: 'TypeScript',
    html_url: 'https://github.com/MahmoudSaberbrisha/sig-auto-showcase',
    homepage: ''
  },
  {
    name: 'dr-white-api',
    description: 'Healthcare backend API focused on service logic, business workflows, and data operations.',
    language: 'JavaScript',
    html_url: 'https://github.com/MahmoudSaberbrisha/dr-white-api',
    homepage: ''
  },
  {
    name: 'dr-white-ui',
    description: 'Modern healthcare user interface for clinical and administrative digital experiences.',
    language: 'TypeScript',
    html_url: 'https://github.com/MahmoudSaberbrisha/dr-white-ui',
    homepage: ''
  },
  {
    name: 'onemillion',
    description: 'Large-scale product and data platform built for growth, analytics, and scalable business workflows.',
    language: 'TypeScript',
    html_url: 'https://github.com/MahmoudSaberbrisha/onemillion',
    homepage: ''
  },
  {
    name: 'campany',
    description: 'Business and company management platform with polished interfaces and operational dashboards.',
    language: 'TypeScript',
    html_url: 'https://github.com/SaraSa3ed/campany',
    homepage: ''
  },
  {
    name: 'clinic',
    description: 'Clinic management system designed for patient operations, appointment flow, and healthcare administration.',
    language: 'TypeScript',
    html_url: 'https://github.com/SaraSa3ed/clinic',
    homepage: ''
  },
  {
    name: 'ADMINCRUD',
    description: 'Admin panel and CRUD management platform for content and business data operations.',
    language: 'CSS',
    html_url: 'https://github.com/SaraSa3ed/ADMINCRUD',
    homepage: ''
  }
];

const projectGrid = document.getElementById('projectsGrid');

function renderProjects(projects) {
  if (!projectGrid) return;
  projectGrid.innerHTML = '';

  projects.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'project-card reveal';

    const head = document.createElement('div');
    head.className = 'project-head';

    const title = document.createElement('h3');
    title.textContent = project.name;

    const badge = document.createElement('span');
    badge.className = 'project-badge';
    badge.textContent = project.language || 'Project';

    head.append(title, badge);

    const description = document.createElement('p');
    description.textContent =
      project.description || 'A project built with a focus on clean architecture and modern user experience.';

    const meta = document.createElement('div');
    meta.className = 'project-meta';

    const tag1 = document.createElement('span');
    tag1.textContent = 'Full Stack';

    const tag2 = document.createElement('span');
    tag2.textContent = project.language || 'Code';

    meta.append(tag1, tag2);

    const links = document.createElement('div');
    links.className = 'project-links';

    const repo = document.createElement('a');
    repo.href = project.html_url;
    repo.target = '_blank';
    repo.rel = 'noreferrer';
    repo.textContent = 'GitHub';
    repo.className = 'primary-link';

    const demo = document.createElement('a');
    demo.href = project.homepage || project.html_url;
    demo.target = '_blank';
    demo.rel = 'noreferrer';
    demo.textContent = project.homepage ? 'Live Demo' : 'Open';

    links.append(repo, demo);

    card.append(head, description, meta, links);
    projectGrid.appendChild(card);
  });

  attachRevealEffects();
}

async function loadProjects() {
  try {
    const response = await fetch('https://api.github.com/users/SaraSa3ed/repos?per_page=100');
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('GitHub API failure');
    }

    const apiProjects = data
      .filter((repo) => !repo.fork && repo.name !== 'SaraSa3ed')
      .map((repo) => ({
        name: repo.name,
        description: repo.description || 'A project focused on user experience, architecture, and scalable development.',
        language: repo.language || 'Code',
        html_url: repo.html_url,
        homepage: repo.homepage || ''
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const mergedProjects = [...featuredProjects, ...apiProjects].filter(
      (project, index, array) =>
        array.findIndex((item) => item.name.toLowerCase() === project.name.toLowerCase()) === index
    );

    renderProjects(mergedProjects);
  } catch (error) {
    renderProjects(featuredProjects);
  }
}

function attachRevealEffects() {
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((element) => observer.observe(element));
}

attachRevealEffects();
loadProjects();
