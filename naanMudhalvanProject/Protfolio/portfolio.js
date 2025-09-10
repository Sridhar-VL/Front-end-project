function showSection(section) {
        let content = document.getElementById('content');
        if (section === 'home') {
            content.innerHTML = `
                <h2>Welcome!</h2>
                <p>Hello! I am a web developer passionate about building clean and responsive websites.</p>
            `;
        } else if (section === 'about') {
            content.innerHTML = `
                <h2>About MySlef</h2>
                <p>I am a developer with experience in HTML, CSS, and JavaScript. I love creating interactive and user-friendly websites.</p>
                <p>By VL SRIDHAR</p>
                `;
        } else if (section === 'projects') {
            content.innerHTML = `
                <h2>My Projects</h2>
                <a href="./portfolio.html" target="_blank"> <div class="project"><strong>Portfolio Website</strong> - A simple responsive portfolio.</div></a>
                <a href="../calculater/calculater.html" target="_blank"> <div class="project"><strong>Calculator</strong> - A simple calculator built with JavaScript.</div></a>              
                <a href="../Todo/todo.html" target="_blank"><div class="project"><strong>To-Do App</strong> - A task management web application.</div></a>

               `;
        } else if (section === 'contact') {
            content.innerHTML = `
                <h2>Contact Me</h2>
                <p>Email: example@mail.com</p>
                <p>Phone: +1234567890</p>
            `;
        }
    }
   
    showSection('home');