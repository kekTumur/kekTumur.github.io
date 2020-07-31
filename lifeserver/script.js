const form = document.querySelector('form');

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    postData('db.json', json)
        .then(res => console.log(res))
        .catch(err => console.log("fail"));

});