const pic=document,getElementById("pic")
const btn = document.getElementById("burgerBtn");
btn.addEventListener("click", () => {
  btn.classList.toggle("active");
  console.log('test');
});
