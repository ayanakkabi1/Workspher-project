
const KEY = "worksphere";

function save(object){
    localStorage.setItem(KEY, JSON.stringify(object));
}

function load(){
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

let employees = load();

formAdd.addEventListener("submit", function(e){
    e.preventDefault();

    const employee = {
        id:Date.now(),
        fullname: inputNom.value,
        email: inputEmail.value,
        phone: inputPhone.value,
        datedepart: inputDateDepart.value,
        findate: inputDateFin.value
    };

    employees.push(employee);
    save(employees);

    console.log(employees);
});
function createcard(employee){
     if(employees.length === 0){
    const paragraphe = document.createElement('p');
    paragraphe.textContent = 'No employee found';
    liststaff.appendChild(paragraphe);
     }
}