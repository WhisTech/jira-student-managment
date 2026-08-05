const form = document.getElementById("authForm");
const msg = document.getElementById("msg");
const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");
const nameField = document.getElementById("nameField");
let mode = "login";

(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) window.location.href = "dashboard.html";
})();

function switchTab(next) {
  mode = next;
  document.getElementById("loginTab").classList.toggle("active", next === "login");
  document.getElementById("signupTab").classList.toggle("active", next === "signup");
  nameField.style.display = next === "signup" ? "block" : "none";
  formTitle.textContent = next === "login" ? "Welcome Back" : "Create Account";
  submitBtn.textContent = next === "login" ? "Login" : "Create Account";
  msg.className = "msg";
  msg.textContent = "";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.className = "msg";
  msg.textContent = "";
  submitBtn.disabled = true;
  submitBtn.textContent = "Please wait...";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (mode === "login") {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { showError(error.message); submitBtn.textContent = "Login"; }
    else window.location.href = "dashboard.html";
  } else {
    const fullName = document.getElementById("fullName").value.trim();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });
    if (error) { showError(error.message); submitBtn.textContent = "Create Account"; }
    else if (data.session) window.location.href = "dashboard.html";
    else {
      msg.className = "msg success";
      msg.textContent = "Account created! Check your email to confirm, then log in.";
      switchTab("login");
    }
  }
  submitBtn.disabled = false;
});

function showError(text) {
  msg.className = "msg error";
  msg.textContent = text;
}