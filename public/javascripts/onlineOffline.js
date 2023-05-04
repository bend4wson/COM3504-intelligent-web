const connectionStatus = document.getElementById('connection-status');

function updateOnlineStatus() {
    if (navigator.onLine) {
        print("111");
        connectionStatus.textContent = 'Online';
        connectionStatus.classList.remove('offline');
        connectionStatus.classList.add('online');
    } else {
        print("222");
        connectionStatus.textContent = 'Offline';
        connectionStatus.classList.remove('online');
        connectionStatus.classList.add('offline');
    }
}

// Initialize the status
updateOnlineStatus();

// Add event listeners for online and offline events
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
