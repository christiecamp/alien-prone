//add comment
async function commentFormHandler(event) {
    event.preventDefault();

    //collect values
    const description = document.querySelector('input[name="description"]').value;

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    //POST request to api endpoint
    if (description) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                description
            }),
            headers: { 'Content-Type': 'application/json' },
        });
    
    //reload 
    if(response.ok)
        document.location.reload();
    } else {
        alert(response.statusText);
        document.querySelector('#comment-form').style.display = 'block';
    }
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);