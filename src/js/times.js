// Check if user is authenticated (JWT exists in localStorage)
const token = localStorage.getItem("jwt");
if (!token) {
  alert("You must log in first!");
  window.location.href = "index.html"; // Redirect to login page
}

// Get username from token (simple parsing; adjust as needed)
const payload = JSON.parse(atob(token.split(".")[1])); // Decode the payload
document.getElementById("user-name").textContent = payload.sub; // Set username

// Update time zones dynamically
const updateTimeZones = () => {
  const container = document.getElementById("time-zones-container");
  container.innerHTML = ""; // Clear previous times

  const selectedZones = JSON.parse(localStorage.getItem("selectedZones")) || ["UTC"];
  selectedZones.forEach((zone) => {
    const currentTime = moment().tz(zone).format("YYYY-MM-DD HH:mm:ss");
    const timeElement = document.createElement("div");
    timeElement.textContent = `${zone}: ${currentTime}`;
    container.appendChild(timeElement);
  });
};

// Handle adding a new time zone
document.getElementById("time-zone-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const zone = document.getElementById("time-zone").value;
  const selectedZones = JSON.parse(localStorage.getItem("selectedZones")) || [];

  if (!selectedZones.includes(zone)) {
    selectedZones.push(zone);
    localStorage.setItem("selectedZones", JSON.stringify(selectedZones));
    updateTimeZones();
  }
});

// Handle logout
document.getElementById("logout-button").addEventListener("click", () => {
  localStorage.removeItem("jwt"); // Remove JWT
  window.location.href = "index.html"; // Redirect to login page
});

// Initialize the page
updateTimeZones();
setInterval(updateTimeZones, 1000); // Update times every second
