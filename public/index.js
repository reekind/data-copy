document.getElementById('openExistingButton').addEventListener('click', () => {
    let id = document.getElementById('existingBoardId').value;

    if (id) {
        window.location.href = '/clipboard.html?id=' + id;
    } else {
        alert("no id given");
    }
});