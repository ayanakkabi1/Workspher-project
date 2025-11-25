// Sélections des éléments
const btn = document.getElementById("burgerBtn");
const photoinput = document.getElementById("photo");
const image = document.getElementById("img");
const addform = document.getElementById("Add");
const buttaddworker = document.getElementById("addnewWorkerBtn");
const SUBMITBUTT = document.getElementById("submitform");
const buttexp = document.getElementById("experiencebutt");
const experiencedivContainer = document.getElementById("experiencedivContainer");
const employeelist = document.getElementById("unassignedStaff");
const inputNom = document.getElementById("fullname");
const roleSelect = document.getElementById("role");
const inputphone = document.getElementById("phone");
const inputemail = document.getElementById("email");
const inputCompany = document.getElementById("company");
const inputstartDate = document.getElementById("datedepart");
const inputendDate = document.getElementById("findate");
const inpurdescription = document.getElementById("description");

const KEY = "worksphere";

// Sauvegarde et chargement
function save(object) {
    localStorage.setItem(KEY, JSON.stringify(object));
}
function load() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}
let employees = load();

// Affichage de la sidebar
function sidebar_load() {
    employeelist.innerHTML = "";
    employees.forEach(function(e) {
        const card = `
        <div style="width:100%; display:flex; flex-direction:row; gap:2%; align-items:center; box-shadow:0 4px 8px rgba(0,0,0,0.2); border-radius:8px; margin-bottom:10px;">
            <img src="${e.picture}" alt="Photo" width="50" height="50" style="border-radius:50%;">
            <div>
                <b>${e.fullname}</b><br>
                ${e.role}
            </div>
        </div>`;
        employeelist.insertAdjacentHTML("beforeend", card);
    });
}

// Affiche et toggle le menu
btn.addEventListener("click", () => {
    btn.classList.toggle("active");
});

// Affiche le formulaire pour ajouter un employé
buttaddworker.addEventListener("click", () => {
    addform.style.display = "block";
});

// Preview d'image
photoinput.addEventListener("input", () => {
    if (photoinput.value === "") {
        image.src = "https://www.svgrepo.com/show/421853/account-avatar-man.svg";
    } else {
        image.src = photoinput.value;
    }
});

// Validation
function valideNom(nom) {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,30}$/;
    return nom.trim() !== "" && regex.test(nom.trim());
}
function valideEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return email.trim() !== "" && regex.test(email.trim());
}
function validePhone(phone) {
    const regex = /^0[5-7][0-9]{8}$/;
    return phone.trim() !== "" && regex.test(phone.trim());
}
function validepic(picture) {
    const regex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
    return picture.trim() !== "" && regex.test(picture.trim());
}

// Ajout d'un employé
SUBMITBUTT.addEventListener("click", function(e) {
    e.preventDefault();
    const name = inputNom.value.trim();
    const role = roleSelect.value;
    const photo = photoinput.value.trim() || "https://www.svgrepo.com/show/421853/account-avatar-man.svg";
    const phone = inputphone.value.trim();
    const email = inputemail.value.trim();

    let isValid = true;

    // Validation des champs
    if (role === "") {
        isValid = false;
        roleSelect.style.borderColor = "red";
        Swal.fire({ icon: "error", title: "Rôle", text: "Sélectionnez un rôle." });
    } else {
        roleSelect.style.borderColor = "";
    }
    if (!valideNom(name)) {
        isValid = false;
        inputNom.style.borderColor = "red";
        Swal.fire({ icon: "error", title: "Nom invalide", text: "Entrez votre nom complet." });
    } else {
        inputNom.style.borderColor = "";
    }
    if (!valideEmail(email)) {
        isValid = false;
        inputemail.style.borderColor = "red";
        Swal.fire({ icon: "error", title: "Email invalide", text: "Entrez un email valide." });
    } else {
        inputemail.style.borderColor = "";
    }
    if (!validePhone(phone)) {
        isValid = false;
        inputphone.style.borderColor = "red";
        Swal.fire({ icon: "error", title: "Téléphone invalide", text: "Entrez un numéro marocain valide." });
    } else {
        inputphone.style.borderColor = "";
    }
    if (!validepic(photo)) {
        isValid = false;
        photoinput.style.borderColor = "red";
        Swal.fire({ icon: "error", title: "Lien image invalide", text: "Entrez un lien valide." });
    } else {
        photoinput.style.borderColor = "";
    }

    if (!isValid) return;

    // Récupérer les expériences
    const experienceInputs = experiencedivContainer.querySelectorAll(".experience-block");
    let experiences = [];
    experienceInputs.forEach(block => {
        const company = block.querySelector("input[type='text']").value.trim();
        const start_date = block.querySelector("input[type='date']").value;
        const end_date = block.querySelectorAll("input[type='date']")[1].value;
        const description = block.querySelector("textarea").value.trim();
        experiences.push({
            company,
            start_date,
            end_date,
            description
        });
    });

    let employee = {
        id: Date.now(),
        fullname: name,
        role: role,
        email: email,
        phone: phone,
        picture: photo,
        curruntroom: "unsigned",
        experiences: experiences
    };

    employees.push(employee);
    save(employees);
    sidebar_load();

    // Reset du formulaire
    addform.reset();
    addform.style.display = "none";
    // Nettoyage des expériences
    experiencedivContainer.innerHTML = '';
});

// Affichage du profil d'un employé
function showProfile(employeeId) {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;

    let expHtml = '<p>Aucune expérience enregistrée.</p>';
    if (employee.experiences.length){
        expHtml = employee.experiences.map(exp => `
            <div>
                <h4>${exp.company}</h4>
                <p>${exp.start_date} - ${exp.end_date || 'Présent'}</p>
                <p>${exp.description}</p>
            </div>
        `).join('');
    }

    Swal.fire({
        title: `${employee.fullname}`,
        html: `
            <img src="${employee.picture}" width="80" height="80" style="border-radius:50%; margin-bottom:10px;">
            <p><b>Rôle :</b> ${employee.role}</p>
            <p><b>Email :</b> ${employee.email}</p>
            <p><b>Téléphone :</b> ${employee.phone}</p>
            <h4>Expériences :</h4>
            ${expHtml}
        `,
        width: 400
    });
}

// Ajout d'un bloc expérience
buttexp.addEventListener("click", function(e) {
    e.preventDefault();
    const newExp = document.createElement("div");
    newExp.classList.add("experience-block");
    newExp.style.border = "1px solid #ccc";
    newExp.style.padding = "10px";
    newExp.style.marginBottom = "10px";

    newExp.innerHTML = `
        <div class="field">
            <label>Nom de l'entreprise</label>
            <input type="text" placeholder="Entreprise">
        </div>
        <div class="field">
            <label>Date début</label>
            <input type="date">
        </div>
        <div class="field">
            <label>Date fin</label>
            <input type="date">
        </div>
        <div class="field">
            <label>Description</label>
            <textarea placeholder="Description"></textarea>
        </div>
        <button type="button" class="removeExpBtn">Supprimer</button>
    `;
    experiencedivContainer.appendChild(newExp);
    newExp.querySelector(".removeExpBtn").addEventListener("click", () => {
        experiencedivContainer.removeChild(newExp);
    });
});

// Filtrer les employés par salle
function filterWorkers(room) {
    let filtred = [];
    if (room === "conference") {
        filtred = employees.filter(w => w.curruntroom === "unsigned");
    }
    else if (room === "workers-Reception") {
        filtred = employees.filter(w => (w.role === "receptionist" || w.role === "manager") && w.curruntroom === "unsigned");
    }
    else if (room === "workers-Server") {
        filtred = employees.filter(w => (w.role === "technician" || w.role === "manager" || w.role === "cleaner") && w.curruntroom === "unsigned");
    }
    else if (room === "workers-Security") {
        filtred = employees.filter(w => (w.role === "security" || w.role === "manager" || w.role === "cleaner") && w.curruntroom === "unsigned");
    }
    else if (room === "workers-Staff") {
        filtred = employees.filter(w => w.curruntroom === "unsigned");
    }
    else if (room === "workers-Archives") {
        filtred = employees.filter(w => w.role === "manager" && w.curruntroom === "unsigned");
    }
    return filtred;
}

function addToRoom(worker, room, limit) {
    let container = document.getElementById(room);
    let count = container.children.length;
    if (count < limit) {
        let div = document.createElement("div");
        div.style.background = "#fff";
        div.style.padding = "6px";
        div.style.display = "flex";
        div.style.gap = "12px";
        div.style.alignItems = "center";
        div.style.borderRadius = "8px";
        div.style.transition = "box-shadow 0.3s";
        div.style.marginBottom = "8px";
        div.style.position = "relative";

        div.innerHTML = `
            <div class="remove-worker" style="
                width:18px; height:18px;
                background:#DC2626;
                display:flex; justify-content:center; align-items:center;
                border-radius:50%;
                cursor:pointer;
                position:absolute; left:4px; top:4px; display:none;
            ">
                <span style="font-size:10px;color:#fff;">–</span>
            </div>
            <div style="width:30px; height:30px; border-radius:15px; overflow:hidden;">
                <img src="${worker.picture}" width="30" alt="profile" style="border-radius:50%;">
            </div>
            <div style="display:flex; flex-direction:column;">
                <p style="font-size:10px; margin:0;">${worker.fullname}</p>
                <p style="font-size:8px; margin:0;">${worker.role}</p>
            </div>
        `;

        // Affichage du profil sur clic du div
        div.addEventListener("click", () => {
            showProfile(worker.id);
        });

        // Affichage et suppression ("display:flex" au hover simulé)
        div.addEventListener("mouseenter", () => {
            div.querySelector(".remove-worker").style.display = "flex";
        });
        div.addEventListener("mouseleave", () => {
            div.querySelector(".remove-worker").style.display = "none";
        });

        let remove_worker = div.querySelector(".remove-worker");
        remove_worker.addEventListener("click", (e) => {
            e.stopPropagation();
            div.remove();
            worker.curruntroom = "unsigned";
            sidebar_load();
        });

        container.appendChild(div);
        worker.curruntroom = room;
        sidebar_load();
    } else {
        alert("Salle pleine !!!");
    }
}


// Chargement initial de la sidebar
sidebar_load();
