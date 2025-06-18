const projectForm = document.getElementById('projectForm');
const projectList = document.getElementById('projectList');

let projects = [];

projectForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const goal = parseFloat(document.getElementById('goal').value);

  const project = {
    id: Date.now(),
    title,
    description,
    goal,
    raised: 0,
    updates: []
  };

  projects.push(project);
  renderProjects();
  projectForm.reset();
});

function renderProjects() {
  projectList.innerHTML = '';

  projects.forEach(project => {
    const div = document.createElement('div');
    div.classList.add('project');
    div.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <p>Goal: $${project.goal.toFixed(2)} | Raised: $${project.raised.toFixed(2)}</p>

      <div class="fund">
        <input type="number" placeholder="Contribute Amount" id="contribution-${project.id}" />
        <button onclick="contribute(${project.id})">Contribute</button>
      </div>

      <div class="update">
        <input type="text" placeholder="New update..." id="update-${project.id}" />
        <button onclick="addUpdate(${project.id})">Add Update</button>
      </div>

      <div id="updates-${project.id}">
        ${project.updates.map(u => `<p>📢 ${u}</p>`).join('')}
      </div>
    `;
    projectList.appendChild(div);
  });
}

function contribute(id) {
  const amountInput = document.getElementById(`contribution-${id}`);
  const amount = parseFloat(amountInput.value);
  const project = projects.find(p => p.id === id);

  if (amount > 0) {
    project.raised += amount;
    renderProjects();
  }
}

function addUpdate(id) {
  const updateInput = document.getElementById(`update-${id}`);
  const text = updateInput.value.trim();
  const project = projects.find(p => p.id === id);

  if (text) {
    project.updates.push(text);
    renderProjects();
  }
}
