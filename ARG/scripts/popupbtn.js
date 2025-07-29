document.addEventListener('DOMContentLoaded', () => {
    // for room pop up 
    const room_popup = document.getElementById('room-popup');
    const popup_btn = document.getElementById('popup-btn');

    popup_btn.addEventListener('click', () => {
        room_popup.style.display = 'none';
    });
});