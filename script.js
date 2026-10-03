const fallbackProjects = [
  {
    name: 'ADMINCRUD',
    description: 'Admin panel and CRUD management system for data operations and content control.',
    language: 'CSS',
    html_url: 'https://github.com/SaraSa3ed/ADMINCRUD',
    homepage: ''
  },
  {
    name: 'campany',
    description: 'Modern business website and company landing page with a polished user experience.',
    language: 'TypeScript',
    html_url: 'https://github.com/SaraSa3ed/campany',
    homepage: ''
  },
  {
    name: 'clinic',
    description: 'Healthcare and clinic management interface focused on booking and patient operations.',
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
    card.className = 'project-card';

    const top = document.createElement('div');
    top.className = 'project-top';

    const title = document.createElement('h3');
    title.textContent = project.name;

    const badge = document.createElement('span');
    badge.className = 'project-badge';
    badge.textContent = project.language || 'Project';

    top.appendChild(title);
    top.appendChild(badge);

    const description = document.createElement('p');
    description.textContent =
      project.description || 'A modern project built with a focus on usability and performance.';

    const meta = document.createElement('div');
    meta.className = 'project-meta';

    const tag1 = document.createElement('span');
    tag1.textContent = 'Full Stack';

    const tag2 = document.createElement('span');
    tag2.textContent = project.language || 'Code';

    meta.appendChild(tag1);
    meta.appendChild(tag2);

    const links = document.createElement('div');
    links.className = 'project-links';

    const repoLink = document.createElement('a');
    repoLink.href = project.html_url;
    repoLink.target = '_blank';
    repoLink.rel = 'noreferrer';
    repoLink.textContent = 'GitHub';

    const demoLink = document.createElement('a');
    demoLink.href = project.homepage || project.html_url;
    demoLink.target = '_blank';
    demoLink.rel = 'noreferrer';
    demoLink.textContent = project.homepage ? 'Live Demo' : 'Project';
    demoLink.classList.add('secondary');

    links.appendChild(repoLink);
    links.appendChild(demoLink);

    card.appendChild(top);
    card.appendChild(description);
    card.appendChild(meta);
    card.appendChild(links);
    projectGrid.appendChild(card);
  });
}

async function loadProjects() {
  try {
    const res = await fetch('https://api.github.com/users/SaraSa3ed/repos?per_page=100');
    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error('GitHub API returned invalid data');
    }

    const repos = data
      .filter((repo) => !repo.fork && repo.name !== 'SaraSa3ed')
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    const finalProjects = repos.length ? repos : fallbackProjects;

    renderProjects(
      finalProjects.map((repo) => ({
        name: repo.name,
        description:
          repo.description || 'Project built with a focus on modern user experiences and scalable engineering.',
        language: repo.language || 'Code',
        html_url: repo.html_url,
        homepage: repo.homepage || ''
      }))
    );
  } catch (error) {
    renderProjects(fallbackProjects);
  }
}

loadProjects();
