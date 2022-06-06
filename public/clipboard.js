const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const clipboardId = urlParams.get('id');

document.getElementById('clipboardTitle').innerText = 'Clipboard ' + clipboardId;

fetch('/api/clipboards/' + clipboardId)
.then(res => {
    if (res.ok) {
    return res.json();
    }
    throw new Error("Not found!");
})
.then((res) => {
    console.log(res);
    document.getElementById('text').value = res._text;
})
.catch((reason) => {
    alert(reason);
});


const socket = io();

const browserId = window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);

socket.emit('clipboard:join', {clipboard_id: clipboardId, browser_id: browserId});

socket.on('clipboard:join', function (data) {
    console.log(data + ' joined');
});

socket.on('clipboard:update', function (data) {
    console.log(data + ' update');

    if (data.sender != browserId) {
        // Set updated info only for data which was not sent by us
    document.getElementById('info-updated').classList.remove('hidden');
    }
});

// Save new Content
document.getElementById('save').addEventListener('click', () => {
    const clipboardContent = document.getElementById('text').value;
    const clipboardUpdate = { sender: browserId, id: clipboardId, text: clipboardContent };
    fetch('/api/clipboards/' + clipboardId, {
        method: 'PUT',
        body: JSON.stringify(clipboardUpdate),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        socket.emit("clipboard:update", clipboardUpdate);
        console.log(res);
    });
});

document.getElementById('copyLink').addEventListener('click', () => {
    alert(window.location);
});