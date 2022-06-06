function createToast(header, body) {
    const $toastFragment = document.querySelector('#toast').content;
    const $toast = document.importNode($toastFragment, true);
    const toastId = 'toast' + Math.floor(Math.random() * 200);
    $toast.children[0].id= toastId;
    document.getElementById('toastContainer')
    .appendChild($toast);

    const toastInDom = document.getElementById(toastId);
    toastInDom.querySelector('strong').innerText = header;
    toastInDom.querySelector('.toast-body').innerText = body;
    const toastElement = new bootstrap.Toast(toastInDom, {delay: 3000});
    toastElement.show();
}