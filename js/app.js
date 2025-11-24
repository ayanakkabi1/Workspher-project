const btn = document.getElementById("burgerBtn");
const photoinput = document.getElementById("photo");
const image = document.getElementById("img");
const buttaddworker = document.getElementById("addnewWorkerBtn");
const addform = document.getElementById("Add");
const employeelist = document.getElementById("unassignedStaff");
const SUBMITBUTT=document.getElementById("submitform")
// Form inputs
const inputNom = document.getElementById("fullname");
const roleSelect = document.getElementById("role");

// Toggle burger menu
btn.addEventListener("click", () => {
    btn.classList.toggle("active");
});

// Show form when clicking add worker
buttaddworker.addEventListener("click", () => {
    addform.style.display = "block";
});

// Photo preview
photoinput.addEventListener("input", () => {
    if (photoinput.value === "") {
        image.src = "https://www.svgrepo.com/show/421853/account-avatar-man.svg";
    } else {
        image.src = photoinput.value;
    }
});

// Handle form submission
SUBMITBUTT.addEventListener("click", (e) => {
    e.preventDefault();

    const name = inputNom.value.trim();
    const role = roleSelect.value;
    const photo = photoinput.value.trim() || "https://www.svgrepo.com/show/421853/account-avatar-man.svg";


    // Create employee card
    const div = document.createElement("div");
    div.classList.add("employee");
    div.style.border="2px solid #ccc";
    div.style.width="100%"
    div.style.display="flex"
    div.style.flexDirection="row"
    div.style.gap="2%"
    div.style.alignItems="center"
    div.style.boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
    div.style.borderRadius="8px"
    div.innerHTML = `
        <img src="${photo}" alt="Photo" width="50" height="50" style="border-radius:50%;">
        <div>
            <b>${name}</b><br>
            ${role}
        </div>
    `;

    employeelist.appendChild(div);

    // Reset form
    addform.reset();
      addform.style.display = "none"; 

});