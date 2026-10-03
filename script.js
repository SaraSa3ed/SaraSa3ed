const fallbackProjects = [
  {
    name: 'ADMINCRUD',
    description: 'Admin panel and CRUD management system for data operations and content management.',
    language: 'CSS',
    html_url: 'https://github.com/SaraSa3ed/ADMINCRUD',
    homepage: ''
  },
  {
    name: 'campany',
    description: 'Business and company landing page with polished UI and service presentation.',
    language: 'TypeScript',
    html_url: 'https://github.com/SaraSa3ed/campany',
    homepage: ''
  },
  {
    name: 'clinic',
    description: 'Clinic management interface and healthcare workflow dashboard for patient operations.',
    language: 'TypeScript',
    html_url: 'https://github.com/SaraSa3ed/clinic',
    homepage: ''
  }
];

const projectGrid = document.getElementById('projectsGrid');

function renderProjects(projects) {
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

    const repos = data
      .filter((repo) => !repo.fork && repo.name !== 'SaraSa3ed')
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    const finalProjects = repos.length ? repos : fallbackProjects;

    renderProjects(
      finalProjects.map((repo) => ({
        name: repo.name,
        description:
          repo.description || 'A project focused on user experience, architecture, and scalable development.',
        language: repo.language || 'Code',
        html_url: repo.html_url,
        homepage: repo.homepage || ''
      }))
    );
  } catch (error) {
    renderProjects(fallbackProjects);
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
