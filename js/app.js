const pic=document.getElementById("pic");
const btn = document.getElementById("burgerBtn");
const photoinput=document.getElementById("photo");
const image=document.getElementById("img");
const buttaddworker=document.getElementById("addWorkerBtn");
const addform=document.getElementById("Add");
const liststaff=document.getElementById("unassignedStaff");

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
// app.js
const KEY = "worksphere";

function load() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

function save(employees) {
    localStorage.setItem(KEY, JSON.stringify(employees));
}

// AFFICHER LES EMPLOYÉS
function displayEmployees() {
    const employeesList = document.getElementById('employeesList');
    const employees = load();

    console.log('Employés à afficher:', employees);

    // Vider le conteneur
    employeesList.innerHTML = '';

    if (employees.length === 0) {
        employeesList.innerHTML = `
            <div class="empty-message">
                <p>📝 Aucun employé trouvé</p>
                <p>Ajoutez votre premier employé pour commencer</p>
            </div>
        `;
        return;
    }

    // Créer un conteneur grid
    const gridContainer = document.createElement('div');
    gridContainer.className = 'employees-grid';

    // Ajouter chaque employé
    employees.forEach(employee => {
        const employeeCard = createEmployeeCard(employee);
        gridContainer.appendChild(employeeCard);
    });

    employeesList.appendChild(gridContainer);
}
