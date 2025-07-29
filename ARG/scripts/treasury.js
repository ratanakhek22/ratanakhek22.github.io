document.addEventListener('DOMContentLoaded', () => {
    // handles the lock input
    const lock_input = document.getElementById('lock-input');
    const lock_btn = document.getElementById('submit-password')
    const flag_redirect = document.getElementById('flag-redirect');
    const door = document.getElementById('door-img');
    
    lock_btn.addEventListener('click', () => {
        // console.log(lock_input.value);
        if (lock_input.value.toLowerCase() == "fortuna major") {
            flag_redirect.style.display = 'inline';
            door.style.display = 'none';
        } else if (lock_input.value.toLowerCase() == "rojam anutrof") {
            window.location.href = '/ARG/7124676563.html';
        };
    });
});