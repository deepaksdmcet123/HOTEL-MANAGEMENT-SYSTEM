// Handle form toggle
function toggleForms() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
}

// Registration
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("regUsername").value.trim();
    const pass = document.getElementById("regPassword").value;
    if (localStorage.getItem("user_" + user)) {
      alert("User already exists");
    } else {
      localStorage.setItem("user_" + user, JSON.stringify({ password: pass, bill: 0 }));
      alert("Registration successful! Login now.");
      toggleForms();
    }
  });
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value;
    const stored = localStorage.getItem("user_" + user);
    if (stored && JSON.parse(stored).password === pass) {
      localStorage.setItem("loggedInUser", user);
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials");
    }
  });
}

// Dashboard
const user = localStorage.getItem("loggedInUser");
if (window.location.pathname.includes("dashboard.html")) {
  if (!user) window.location.href = "index.html";
  document.getElementById("userDisplay").innerText = user;

  const bookingForm = document.getElementById("bookingForm");
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const nights = parseInt(document.getElementById("nights").value);
    const room = document.getElementById("roomType").value;
    let cost = room === "Deluxe" ? 3500 : 5000;
    let total = cost * nights;

    let data = JSON.parse(localStorage.getItem("user_" + user));
    data.bill += total;
    localStorage.setItem("user_" + user, JSON.stringify(data));

    showBill();
  });

  function showBill() {
    const data = JSON.parse(localStorage.getItem("user_" + user));
    document.getElementById("billDisplay").innerText = `Total Due: ₹${data.bill}`;
  }

  showBill();
}

// Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
