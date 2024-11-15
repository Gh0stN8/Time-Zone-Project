
import 'moment-timezone';

// Display the current time in local time zone
function displayCurrentTime() {
  const currentTimeElement = document.getElementById('current-time');
  const now = moment().format('YYYY-MM-DD HH:mm:ss');
  currentTimeElement.textContent = `Current Time: ${now}`;
}

// Update the current time every second
setInterval(displayCurrentTime, 1000);

// Handle time zone conversion based on user selection
async function convertTimeZone() {
  const timeToConvert = moment().format('YYYY-MM-DD HH:mm:ss'); // Or use a specific input time
  const selectedTimeZone = document.getElementById('timezone-select').value;
  
  try {
    // Send request to /convert-time endpoint with selected timezone
    const response = await axios.post('/convert-time', {
      time: timeToConvert,
      targetTimeZone: selectedTimeZone,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    });

    // Display converted time
    const convertedTimeElement = document.getElementById('converted-time');
    convertedTimeElement.textContent = `Converted Time: ${response.data.convertedTime}`;
  } catch (error) {
    console.error('Error converting time:', error);
  }
}

// Set up event listener for the time zone dropdown
document.getElementById('timezone-select').addEventListener('change', convertTimeZone);

// Display initial time when page loads
document.addEventListener('DOMContentLoaded', () => {
  displayCurrentTime();
});
