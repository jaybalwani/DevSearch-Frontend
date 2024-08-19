let form = document.querySelector('.login--form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let formData = {
        "username": form.username.value,
        "password": form.password.value
    }

    fetch('http://127.0.0.1:8000/api/users/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        let token = data.access

        if (token){
            localStorage.setItem('token', token)
            window.location = 'file:///home/jaybalwani/Projects/Frontend/projects.html'
        }
        else{
            alert('Username or password did not match')
        }
    })
})