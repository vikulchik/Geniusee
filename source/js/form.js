(function() {
  const form = document.querySelector('.subscription__form');
  const emailField = form.querySelector('.subscription__field');
  const maxAge = 2.592e+6; // 30 days

  function send(e) {
    e.preventDefault();
    const email = emailField.value;
    setCookie(email);
    // Prepare all needed data and send ajax request
    fetch('https://jsonplaceholder.typicode.com/todos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email
      })
    });
  }

  form.addEventListener('submit', send);

  function setCookie(email) {
    document.cookie = `email=${email}; max-age=${maxAge}`;
  }
}());


