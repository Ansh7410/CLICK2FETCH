const userContainer = document.getElementById("user-container");
const reloadBtn = document.getElementById("reload");
const searchInput = document.getElementById("search");

let allUsers = []; // Store all fetched users for searching

async function fetchUserData() {
  // Show loading spinner
  userContainer.innerHTML = `<div class="spinner"></div>`;
  
  try {
    const response = await fetch("https://randomuser.me/api/?results=10");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    allUsers = data.results; // Store in global variable
    displayUsers(allUsers);

  } catch (error) {
    userContainer.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
}

function displayUsers(users) {
  userContainer.innerHTML = "";
  
  users.forEach(user => {
    const card = document.createElement("div");
    card.classList.add("user-card");
    card.innerHTML = `
      <h3>${user.name.first} ${user.name.last}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>City:</strong> ${user.location.city}</p>
      <p><strong>Address:</strong> ${user.location.street.name}</p>
      <img src="${user.picture.medium}" alt="${user.name.first}" style="border-radius:50%; margin-top:10px;">
    `;
    userContainer.appendChild(card);
  });
}

// Filter users as you type
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = allUsers.filter(user =>
    user.name.first.toLowerCase().includes(query) ||
    user.name.last.toLowerCase().includes(query) ||
    user.location.city.toLowerCase().includes(query)
  );
  displayUsers(filtered);
});

// Only fetch data when reload button is clicked
reloadBtn.addEventListener("click", fetchUserData);
