document.getElementById('openExistingButton')
.addEventListener('click', openExisting);
document.getElementById('existingBoardId')
.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        openExisting();
    }
});

function openExisting()
{
    let id = document.getElementById('existingBoardId').value;
    if (id) {
        window.location.href = '/clipboard.html?id=' + id;
    } else {
        alert("no id given");
    }
}

document.getElementById('addButton').addEventListener('click', () => {
    fetch('/api/clipboards', {
        method: 'POST'
    }).then((res) => {
        return res.json();
    }).then((json) => {
        window.location.href = '/clipboard.html?id=' + json.id;
    }).catch((reason) => {
        alert(reason);
    });
});

