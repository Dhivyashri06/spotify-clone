function showRegister() {
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("registerSection").style.display = "block";
}

function showLogin() {
  document.getElementById("registerSection").style.display = "none";
  document.getElementById("loginSection").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const uname = document.getElementById("uname").value;
      const pwd = document.getElementById("pwd").value;
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uname, pwd })
      });
      alert(await res.text());
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const uname = document.getElementById("unameReg").value;
      const email = document.getElementById("emailReg").value;
      const pwd = document.getElementById("pwdReg").value;
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uname, email, pwd })
      });
      alert(await res.text());
    });
  }
});
