const formAdd = document.getElementById("Add");
const inputNom = document.getElementById("fullname");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");
const inputDateDepart = document.getElementById("datedepart");
const inputDateFin = document.getElementById("findate");
const buttexp = document.querySelector(".experiencebutt");

// Validation du nom
function valideNom(nom) {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,30}$/;
    return nom.trim() !== "" && regex.test(nom.trim());
}

// Validation de l'email
function valideEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return email.trim() !== "" && regex.test(email.trim());
}

// Validation du téléphone marocain
function validePhone(phone) {
    const regex = /^0[5-7][0-9]{8}$/;
    return phone.trim() !== "" && regex.test(phone.trim());
}

formAdd.addEventListener("submit", function (e) {
    e.preventDefault();

    const nomValue = inputNom.value;
    const emailValue = inputEmail.value;
    const phoneValue = inputPhone.value;

    if (!valideNom(nomValue)) {
        alert("Nom invalide ! Veuillez entrer un nom correct.");
        return;
    }

    if (!valideEmail(emailValue)) {
        alert("Email invalide !");
        return;
    }

    if (!validePhone(phoneValue)) {
        alert("Invalid phone number! Please enter a valid Moroccan number.");
        return;
    }

    alert("Nom, email et téléphone valides !");
});

// Vérification des dates
buttexp.addEventListener("click", function () {

    const dateDepartValue = inputDateDepart.value;
    const dateFinValue = inputDateFin.value;

    if (!dateDepartValue || !dateFinValue) {
        alert("Veuillez remplir les deux dates !");
        return;
    }

    const dateDepart = new Date(dateDepartValue);
    const dateFin = new Date(dateFinValue);

    if (dateDepart >= dateFin) {
        alert("La date de départ doit être inférieure à la date de fin !");
        inputDateDepart.style.borderColor = "red";
        inputDateFin.style.borderColor = "red";
    } else {
        alert("Dates valides !");
        inputDateDepart.style.borderColor = "";
        inputDateFin.style.borderColor = "";
    }
});
