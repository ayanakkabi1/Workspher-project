
const btn = document.getElementById("burgerBtn");
btn.addEventListener("click", () => {
  btn.classList.toggle("active");
  console.log('test');
});
function createemploye(employee){
   const div= document.createElement("div");
   div.classList.add("employee");
   div.id="emp"
    
}