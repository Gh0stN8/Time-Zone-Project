import moment from 'moment';
import axios from 'axios';

const currentTimeElement = document.getElementById('current-time');
const updateTime = () => {
  currentTimeElement.textContent = moment().format('YYYY-MM-DD HH:mm:ss');
};
setInterval(updateTime, 1000);

const loginButton = document.getElementById('login-btn');
const loginForm = document.getElementById('login-form');
const timezoneConverter = document.getElementById('timezone-converter');

loginButton.addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await axios.post('http://localhost:3000/login', { username, password });
    localStorage.setItem('token', response.data.token);
    loginForm.style.display = 'none';
    timezoneConverter.style.display = 'block';
  } catch (error) {
    console.error('Login failed', error);
  }
});

const convertButton = document.getElementById('convert-time-btn');
convertButton.addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  const timezone = document.getElementById('timezone-select').value;
  try {
    const response = await axios.post('http://localhost:3000/convert-time', { timezone }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    document.getElementById('converted-time').textContent = response.data.convertedTime;
  } catch (error) {
    console.error('Time conversion failed', error);
  }
});

