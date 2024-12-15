document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('loginForm');
    const loginError = document.getElementById('login-error');

    form.addEventListener('submit', async function(e){
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try{
            const response = await fetch('backend/login.php', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/x-www-from-urlencode'
                },
                body: new URLSearchParams({email: email, password: password})
            });

            const resul = response.json();
            if(response.ok){
                window.location.href = "dashboard.html";
            }else{
                loginError.style.display = 'block';
                loginError.textContent = resul.error || 'Invalid username or password';
            }


        }catch(error){
            loginError.style.display = 'block';
            loginError.textContent = 'There was an error in your request'
        }

    });
})