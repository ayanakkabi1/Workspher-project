
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
formAdd.addEventListener("submit", function (e) {
    e.preventDefault();

    const nomValue = inputNom.value;
    const emailValue = inputEmail.value;
    const phoneValue = inputPhone.value;
    const picValue= picture.value;
    const roleValue= roleSelect.value;
     if (roleValue === "") {
        isValid = false;
        errorMessage = "Please select a role.";
        roleSelect.style.borderColor = "red";
    } else {
        roleSelect.style.borderColor = "";
    }
    if (!valideNom(nomValue) && nomValue==='') {   
    Swal.fire({
        icon: "error",
        title: "Invalid name",
        text: "Please enter your full name."
    });
    inputNom.style.borderColor = "red";
}else {
        inputNom.style.borderColor = "";
    }

    if (!valideEmail(emailValue) && emailValue==='') {
        Swal.fire({
        icon: "error",
        title: "Invalid email",
        text: "Please enter a valid email."
    });
    inputEmail.style.borderColor = "red";
    }else {
        inputEmail.style.borderColor = "";
    }

    if (!validePhone(phoneValue) && phoneValue==='') {
        Swal.fire({
        icon: "error",
        title: "Invalid phone",
        text: "Invalid phone number! Please enter a valid Moroccan number."
    });
    inputPhone.style.borderColor = "red";
    }else {
        inputPhone.style.borderColor = "";
    }
     if (!validepic(picValue) && picValue==='') {
        Swal.fire({
        icon: "error",
        title: "Invalid picture",
        text: "Please enter a valid link."
    });
    picture.style.borderColor = "red";
    }else {
    picture.style.borderColor = "";
    }
});

buttexp.addEventListener("click", function () {

    const dateDepartValue = inputDateDepart.value;
    const dateFinValue = inputDateFin.value;

    if (!dateDepartValue || !dateFinValue) {
         Swal.fire({
        icon: "error",
        title: "Invalid date",
        text: "Please enter a valid Date."
        });
    }

    const dateDepart = new Date(dateDepartValue);
    const dateFin = new Date(dateFinValue);

    if (dateDepart >= dateFin) {
        Swal.fire({
        icon: "error",
        title: "Invalid dates",
        text: "La date de départ doit être inférieure à la date de fin !"
    });
        inputDateDepart.style.borderColor = "red";
        inputDateFin.style.borderColor = "red";
    } else {
        inputDateDepart.style.borderColor = "";
        inputDateFin.style.borderColor = "";
    }
});

