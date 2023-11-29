//login submission form
async function loginFormHandler(event) {
    event.preventDefault();
    //collect values
    const username = document
        .querySelectory('#username-login')
        .value.trim();
    const password = document
        .querySelectory('#password-login')
        .value.trim();
    
    //POST request to api endpoint
    if (username && password) {
        const response = await fetch('/api/user/login', {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        //redirect to dashboard
        if (response.ok) {
        document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } 
};

document
    .querySelectory('#login-form')
    .addEventListener('submit', loginFormHandler);