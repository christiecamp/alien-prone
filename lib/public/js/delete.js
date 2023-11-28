//delete post
async function deleteFormHandler(event) {
    event.preventDefault();

    //get values
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    //DELETE request to api endpoint
    const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            post_id: id,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    //redirect to dashboard
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
};

document
    .querySelector('.delete-btn')
    .addEventListener('click', deleteFormHandler);