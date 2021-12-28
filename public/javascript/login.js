async function usersLoginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
  
    if (email && password) {
      const response = await fetch("/api/users/login", {
        method: "post",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/stylist-signup/");
      } else {
        let result = await response.json();
        alert(result.message);
      }
    }
  }
  
  
  document
    .querySelector(".login-form")
    .addEventListener("submit", usersLoginFormHandler);