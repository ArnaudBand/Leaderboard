const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/bCZxO4pdTbCdS1aVPCpA/scores/';

const displayUI = (users) => {
  const borderDiv = document.querySelector('.border_div');
  borderDiv.innerHTML = '';
  users.forEach((user) => {
    borderDiv.innerHTML += `
    <div class="col1"> 
        <p> ${user.user}: gets ${user.score}</p>
    </div>`;
  });
};

const fetchData = async () => {
  const data = await fetch(url);
  return data.json();
};

const insertData = async () => {
  const users = await fetchData();
  displayUI(users.result);
};

const callApi = async (data) => {
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
  insertData();
});

scoreForm.addEventListener('click', async (e) => {
  e.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const score = document.querySelector('#score').value.trim();
  const form = document.querySelector('.input_div');

  if (name !== '' && score !== '') {
    await callApi([name, score]);
    insertData();
  }
  form.reset();
});