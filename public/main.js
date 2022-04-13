const socket = io();

const browserId = window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);

socket.emit('clipboard:join', {clipboard_id: clipboardId, browser_id: browserId});

socket.on('clipboard:join', function (data) {
    console.log(data + ' joined');
});

socket.on('clipboard:update', function (data) {
    console.log(data + ' update');
    document.getElementById('info-updated').classList.remove('hidden');
});

// Save new Content
document.getElementById('save').addEventListener('click', () => {
    const clipboardContent = document.getElementById('text').value;
    fetch('/api/clipboards/' + clipboardId, {
        method: 'POST',
        body: JSON.stringify({ text: clipboardContent }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        socket.emit("clipboard:update", clipboardId);
        console.log(res);
    });
});