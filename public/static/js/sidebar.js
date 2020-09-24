document.addEventListener("DOMContentLoaded", function(event) { 
    const navs = document.querySelectorAll('.sec-nav');
    for(const n of navs){
        n.addEventListener('click', function(event) {
            const id = this.dataset.collapse;
            document.getElementById(id).classList.toggle('d-none');
            document.querySelector(`div[data-collapse=${id}] div.flecha i.fa-caret-down`).classList.toggle('d-none');
            document.querySelector(`div[data-collapse=${id}] div.flecha i.fa-caret-up`).classList.toggle('d-none');
        })
    }
});