// ==========================
// ELEMENTS HTML
// ==========================
const btn = document.getElementById("burgerBtn");
const photoinput = document.getElementById("photo");
const image = document.getElementById("pic");
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
const photoinputLink = document.getElementById("photo");
const inputCompany = document.getElementById("company");
const inputstartDate = document.getElementById("datedepart");
const inputendDate = document.getElementById("findate");
const inputdescription = document.getElementById("description");


// ==========================
// LOCALSTORAGE
// ==========================
const KEY = "worksphere";

function save(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
}

function load() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

let employees = load();
sidebar_load();

// ==========================
// SIDEBAR – LISTE DES EMPLOYÉS
// ==========================
function sidebar_load() {
    employeelist.innerHTML = "";

    employees.forEach(e => {

        if (e.curruntroom !== "unsigned") return; // affichage uniquement des libres

        let card = document.createElement("div");
        card.className = "worker-card";
        card.style.cssText = `
            width:100%;
            display:flex;
            gap:10px;
            align-items:center;
            border-radius:8px;
            padding:8px;
            box-shadow:0 4px 8px rgba(0,0,0,0.2);
            cursor:grab;
        `;
        card.draggable = true;
        card.dataset.id = e.id;

        card.innerHTML = `
            <img src="${e.picture}" width="45" height="45" style="border-radius:50%;">
            <div>
                <b>${e.fullname}</b><br>
                <span style="font-size:12px">${e.role}</span>
            </div>
        `;

        // Drag start
        card.addEventListener("dragstart", ev => {
            ev.dataTransfer.setData("workerId", e.id);
        });

        employeelist.appendChild(card);
    });
}
// ==========================
// BOUTON BURGER – TOGGLE MENU
// ==========================
btn.addEventListener("click", () => {
    btn.classList.toggle("active");
});

// ==========================
// AFFICHER FORMULAIRE AJOUT EMPLOYÉ
// ==========================
buttaddworker.addEventListener("click", () => {
    addform.style.display = "block";
});

// ==========================
// PREVIEW IMAGE
// ==========================
photoinput.addEventListener("input", () => {
    if (!photoinput.value.trim()) {
        image.src = "https://www.svgrepo.com/show/421853/account-avatar-man.svg";
    } else {
        image.src = photoinput.value.trim();
    }
});

// ==========================
// VALIDATION DES CHAMPS
// ==========================
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

function validePic(picture) {
    const regex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
    return picture.trim() !== "" && regex.test(picture.trim());
}

// ==========================
// AJOUTER UN BLOC EXPERIENCE
// ==========================
buttexp.addEventListener("click", function(e) {
    e.preventDefault();

    const newExp = document.createElement("div");
    newExp.classList.add("experience-block");
    newExp.style.cssText = `
        border:1px solid #ccc;
        padding:10px;
        margin-bottom:10px;
        border-radius:6px;
    `;

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

    // Ajouter au conteneur
    experiencedivContainer.appendChild(newExp);

    // Supprimer le bloc expérience
    newExp.querySelector(".removeExpBtn").addEventListener("click", () => {
        experiencedivContainer.removeChild(newExp);
    });
});
// ==========================
// AFFICHER LE FORMULAIRE
// ==========================
buttaddworker.addEventListener("click", () => {
    addform.style.display = "block";
});

// ==========================
// PREVIEW IMAGE
// ==========================
photoinput.addEventListener("input", () => {
    image.src = photoinput.value.trim() || "https://www.svgrepo.com/show/421853/account-avatar-man.svg";
});

// ==========================
// AJOUT D’UN EMPLOYÉ
// ==========================
SUBMITBUTT.addEventListener("click", function(e) {
    e.preventDefault();

    const name = inputNom.value.trim();
    const role = roleSelect.value;
    const photo = photoinput.value.trim() || "https://www.svgrepo.com/show/421853/account-avatar-man.svg";
    const phone = inputphone.value.trim();
    const email = inputemail.value.trim();

    let isValid = true;

    // Validation
    if (!valideNom(name)) { isValid = false; inputNom.style.borderColor = "red"; }
    else inputNom.style.borderColor = "";

    if (!valideEmail(email)) { isValid = false; inputemail.style.borderColor = "red"; }
    else inputemail.style.borderColor = "";

    if (!validePhone(phone)) { isValid = false; inputphone.style.borderColor = "red"; }
    else inputphone.style.borderColor = "";

    if (role === "") { isValid = false; roleSelect.style.borderColor = "red"; }
    else roleSelect.style.borderColor = "";

    if (!validePic(photo)) { isValid = false; photoinput.style.borderColor = "red"; }
    else photoinput.style.borderColor = "";

    if (!isValid) {
        Swal.fire({ icon:"error", title:"Erreur", text:"Veuillez corriger les champs en rouge." });
        return;
    }

    // Récupérer les expériences
    const experienceBlocks = experiencedivContainer.querySelectorAll(".experience-block");
    const experiences = Array.from(experienceBlocks).map(block => {
        const company = block.querySelector("input[type='text']").value.trim();
        const start_date = block.querySelectorAll("input[type='date']")[0].value;
        const end_date = block.querySelectorAll("input[type='date']")[1].value;
        const description = block.querySelector("textarea").value.trim();
        return { company, start_date, end_date, description };
    });

    // Création de l’employé
    const employee = {
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

    // Reset formulaire et expériences
    addform.reset();
    addform.style.display = "none";
    experiencedivContainer.innerHTML = "";
});
function showProfile(employeeId) {
    const employee = employees.find(e => e.id === employeeId);
    if (!employee) return;

    let expHtml = "<p>Aucune expérience enregistrée.</p>";
    if (employee.experiences.length > 0) {
        expHtml = employee.experiences.map(exp => `
            <div style="border-top:1px solid #ccc; padding-top:5px; margin-top:5px;">
                <b>${exp.company}</b><br>
                ${exp.start_date} - ${exp.end_date || "Présent"}<br>
                ${exp.description}
            </div>
        `).join("");
    }

    Swal.fire({
        title: employee.fullname,
        html: `
            <img src="${employee.picture}" width="80" height="80" style="border-radius:50%; margin-bottom:10px;">
            <p><b>Rôle:</b> ${employee.role}</p>
            <p><b>Email:</b> ${employee.email}</p>
            <p><b>Téléphone:</b> ${employee.phone}</p>
            <h4>Expériences:</h4>
            ${expHtml}
        `,
        width: 400
    });
}
// ==========================
// FILTRER LES EMPLOYÉS PAR SALLE
// ==========================
function filterWorkers(roomID) {
    const allowedRoles = {
        "conferencestaff": ["*"], // tout le monde
        "reception-staff": ["Receptionists", "Manager"],
        "server-staff": ["IT", "Manager", "CleaningStaff"],
        "security-staff": ["SecurityAgents", "Manager", "CleaningStaff"],
        "staff-staff": ["*"], // tout le monde
        "archive-staff": ["Manager"]
    };

    const roles = allowedRoles[roomID];
    return employees.filter(w => {
        if (w.curruntroom !== "unsigned") return false;
        if (roles.includes("*")) return true;
        return roles.includes(w.role);
    });
}

// ==========================
// AJOUTER UN EMPLOYÉ DANS UNE SALLE
// ==========================
function addToRoom(worker, roomID, limit) {
    const container = document.getElementById(roomID);
    if (!container) return;

    if (container.children.length >= limit) {
        Swal.fire({ icon: "error", title: "Salle pleine !" });
        return;
    }

    if (container.children.length === 0) {
        container.parentElement.classList.remove("empty-room")
    }
    // console.log(container.parentElement.ATTRIBUTE_NODE);

    const div = document.createElement("div");
    div.className = "worker-in-room";
    div.draggable = true;
    div.dataset.id = worker.id;
    div.style.cssText = `
        display:flex;
        align-items:center;
        gap:10px;
        padding:6px;
        margin-bottom:6px;
        background:#fff;
        border-radius:8px;
        cursor:pointer;
        position:relative;
    `;
    div.innerHTML = `
        <div class="remove-worker" style="
            width:18px;height:18px;
            background:#DC2626;
            display:flex;
            justify-content:center;
            align-items:center;
            border-radius:50%;
            cursor:pointer;
            position:absolute; left:4px; top:4px;
            display:none;
        ">
            <span style="font-size:10px;color:#fff;">–</span>
        </div>
        <img src="${worker.picture}" width="30" height="30" style="border-radius:50%;">
        <div style="display:flex; flex-direction:column;">
            <p style="font-size:10px; margin:0;">${worker.fullname}</p>
            <p style="font-size:8px; margin:0;">${worker.role}</p>
        </div>
    `;

    // Afficher profil au clic
    div.addEventListener("click", () => showProfile(worker.id));

    // Bouton supprimer
    div.addEventListener("mouseenter", () => div.querySelector(".remove-worker").style.display = "flex");
    div.addEventListener("mouseleave", () => div.querySelector(".remove-worker").style.display = "none");
    div.querySelector(".remove-worker").addEventListener("click", e => {
        e.stopPropagation();
        // console.log(div.parentElement);
        
        
        if (div.parentElement.children.length === 1) {
            div.parentElement.parentElement.classList.add("empty-room");
        }
        // console.log(div.parentElement.chi);
        
        // console.log(div.parentElement.parentElement);
        

        div.remove();

        worker.curruntroom = "unsigned";
        save(employees);
        sidebar_load();
    });

    // Drag & Drop depuis la salle
    div.addEventListener("dragstart", ev => {
        ev.dataTransfer.setData("workerId", worker.id);
    });

    container.appendChild(div);
    worker.curruntroom = roomID;
    save(employees);
    sidebar_load();
}

// ==========================
// OUVRIR POPUP POUR AJOUTER EMPLOYÉ
// ==========================
function openWorkerSelector(roomID, limit) {
    const list = filterWorkers(roomID);
    if (list.length === 0) {
        Swal.fire({ icon: "warning", title: "Aucun employé disponible" });
        return;
    }

    const html = list.map(w => `
        <div style="
            display:flex;
            align-items:center;
            gap:10px;
            padding:8px;
            border:1px solid #ddd;
            border-radius:6px;
            cursor:pointer;
            margin-bottom:6px;
        " onclick="selectWorkerToAdd(${w.id}, '${roomID}', ${limit})">
            <img src="${w.picture}" width="35" height="35" style="border-radius:50%;">
            <div>
                <b>${w.fullname}</b><br>
                <small>${w.role}</small>
            </div>
        </div>
    `).join("");

    Swal.fire({
        title: "Choisir un employé",
        html: html,
        width: 400,
        showConfirmButton: false
    });
}

function selectWorkerToAdd(workerId, roomID, limit) {
    const worker = employees.find(w => w.id === workerId);
    addToRoom(worker, roomID, limit);
    Swal.close();
}

// ==========================
// CONNECTER LES BOUTONS "+"
// ==========================
document.getElementById("conferenceadd").addEventListener("click", () => openWorkerSelector("conferencestaff", 10));
document.getElementById("receptionadd").addEventListener("click", () => openWorkerSelector("reception-staff", 3));
document.getElementById("serveradd").addEventListener("click", () => openWorkerSelector("server-staff", 4));
document.getElementById("securityadd").addEventListener("click", () => openWorkerSelector("security-staff", 4));
document.getElementById("staffadd").addEventListener("click", () => openWorkerSelector("staff-staff", 10));
document.getElementById("archiveadd").addEventListener("click", () => openWorkerSelector("archive-staff", 1));

sidebar_load() ;