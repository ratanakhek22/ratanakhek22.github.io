document.addEventListener('DOMContentLoaded', () => {
    // for room pop up 
    const room_popup = document.getElementById('room-popup');
    const popup_btn = document.getElementById('popup-btn');

    popup_btn.addEventListener('click', () => {
        room_popup.style.display = 'none';
    });

    // handles the lock input
    const lock_input = document.getElementById('lock-input');
    const flag_redirect = document.getElementById('flag-redirect');
    const door = document.getElementById('door-img');
    
    lock_input.addEventListener('change', () => {
        console.log(lock_input.value);
        if (lock_input.value.toLowerCase() == "fortuna major") {
            flag_redirect.style.display = 'inline';
            door.style.display = 'none';
        };
    });
});