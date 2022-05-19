const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/bCZxO4pdTbCdS1aVPCpA/scores/';

const updateDom = (users) => {
  const borderDiv = document.querySelector('.border_div');
  borderDiv.innerHTML = '';
  users.forEach((user) => {
    borderDiv.innerHTML += `
    <div class="col1"> 
        <p> ${user.user}:${user.score}</p>
    </div>`;
  });
};

const fetchUsers = async () => {
  const data = await fetch(url);
  return data.json();
};

const insertUsers = async () => {
  const users = await fetchUsers();
  updateDom(users.result);
};

const addUser = async (data) => {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: data[0], score: data[1] }),
  });
};

const scoreForm = document.querySelector('#submit_btn');
const refreshButton = document.querySelector('.left-space');

refreshButton.addEventListener('click', () => {
  insertUsers();
});

scoreForm.addEventListener('click', async (e) => {
  e.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const score = document.querySelector('#score').value.trim();
  const form = document.querySelector('.input_div');

  if (name !== '' && score !== '') {
    await addUser([name, score]);
    insertUsers();
  }
  form.reset();
});