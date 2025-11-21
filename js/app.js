const pic=document.getElementById("pic");
const btn = document.getElementById("burgerBtn");
const photoinput=document.getElementById("photo");
const image=document.getElementById("img");
const buttaddworker=document.getElementById("addWorkerBtn");
const addform=document.getElementById("Add");

btn.addEventListener("click", () => {
  btn.classList.toggle("active");
  console.log('test');
});
photoinput.addEventListener("input", () => {
        if (photoinput.value === "") {
            image.src = "https://www.svgrepo.com/show/421853/account-avatar-man.svg";
        } else {
            image.src = photoinput.value;
        }
    }); 


buttaddworker.addEventListener('click', function() {
  addform.style.display = 'block';
});