async function logout() {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    //redirect to homepage
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document
    .querySelector('#logout')
    .addEventListener('click', logout);