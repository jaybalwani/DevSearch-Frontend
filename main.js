resource = 'http://127.0.0.1:8000/api/projects/'

let loginBtn = document.querySelector('.loginBtn')
let logoutBtn = document.querySelector('.logoutBtn')

if (localStorage.getItem('token')){
    loginBtn.remove()
}
else{
    logoutBtn.remove()
}

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    window.location = 'file:///home/jaybalwani/Projects/Frontend/login.html'
})

let getProjects = () => {
    fetch(resource)
        .then(data => data.json())
        .then(data => {
            renderProjects(data)
        })
}

let renderProjects = projects => {
    let projectsWrapper = document.querySelector('.projects--wrapper')
    projectsWrapper.innerHTML = ''
    for (let i=0; i<projects.length; i++){
        let project = projects[i]
        let projectCard = `
       <div class="project--card">
            <img src="http://127.0.0.1:8000${project.image}" alt="">
            <div>
                <div class="card--header">
                    <h1>${project.title}</h1>
                    <strong class="vote--option" data-vote="up" data-project="${project.id}">&#43;</strong>
                    <strong class="vote--option" data-vote="down" data-project="${project.id}">&#8722;</strong>
                </div>
                <i>${project.vote_ratio}% Positive Feedback</i>
                <p>${project.description.substring(0,150)}</p>
            </div>
        </div>
        `
        projectsWrapper.innerHTML += projectCard

    }
    addVoteEvents()
}

let addVoteEvents = () => {
    let voteOption = document.getElementsByClassName('vote--option')

    for (let i=0; i<voteOption.length; i++){
        voteOption[i].addEventListener('click', (e) => {
            let token = localStorage.getItem('token')
            let vote = e.target.dataset.vote
            let project = e.target.dataset.project

            fetch(`http://127.0.0.1:8000/api/projects/${project}/vote/`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({"value":vote})
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                getProjects()
            })

            
        })
    }
}

getProjects()
