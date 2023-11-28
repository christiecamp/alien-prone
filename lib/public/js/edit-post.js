//edit post
async function editFormHandler(event) {
    event.preventDefault();

   //collect values 
    const title = document
        .querySelector('input[name="post-title"]')
        .value.trim();
    const content = document
        .querySelector('textarea[name="content"]')
        .value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    //PUT request to api endpoint
    if (title && content) {
        const response = await fetch(`/api/post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                post_id: id,
                title,
                content
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        //redirect to dashboard
        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.edit-post-form')
    .addEventListener('submit', editFormHandler);
