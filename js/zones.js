// Maintien des fonctions formatZoneName et isEligibleForZone
function formatZoneName(zone) {
    const zoneNames = {
        'conference': 'Conference Room',
        'reception': 'Reception',
        'server': 'Server Room',
        'security': 'Security Room',
        'staff': 'Staff Room',
        'archive': 'Archive Room'
    };
    return zoneNames[zone] || zone;
}

// Check if employee is eligible for zone
function isEligibleForZone(role, zone) {
    const restrictions = {
        'Receptionists': ['reception'],
        'IT': ['server'],
        'SecurityAgents': ['security'],
        'CleaningStaff': ['conference', 'reception', 'server', 'security', 'staff']
    };

    if (role === 'Manager') return true;

    if (role === 'CleaningStaff' && zone === 'archive') return false;

    // Correction de la logique: Si une restriction est définie, l'employé DOIT être dans l'une de ces zones.
    // Les CleaningStaff sont le cas spécial où ils PEUVENT être dans les zones listées.
    // L'implémentation actuelle suppose que seuls les rôles listés ont des zones spécifiques.
    if (restrictions[role]) {
        // Retourne vrai SEULEMENT si la zone est dans la liste de restrictions pour le rôle
        return restrictions[role].includes(zone); 
    }

    // Par défaut, tous les autres rôles peuvent aller partout, SAUF les zones restreintes pour d'autres (comme archive pour CleaningStaff)
    // Ici, la logique actuelle du code semble être : si un rôle n'est pas dans 'restrictions', il peut aller n'importe où.
    return true; 
}


// Assign to Zone
function assignToZone(employeeId, zone) {
    // Assurez-vous que 'employees' est défini et contient les données
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
        // Vérification d'éligibilité (bonne pratique)
        if (!isEligibleForZone(employee.role, zone)) {
            alert(`${employee.fullname} n'est pas éligible pour la zone ${formatZoneName(zone)}.`);
            return;
        }
        employee.assignedZone = zone;
        saveEmployees();
        updateUI();
        // S'assurer que assignStaffModal est défini et existe avant d'utiliser classList
        if (assignStaffModal) { 
            assignStaffModal.classList.remove('active');
        } else {
            console.error("L'élément 'assignStaffModal' est introuvable.");
        }
    }
}

// Remove from Zone
function removeFromZone(employeeId) {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
        employee.assignedZone = null;
        saveEmployees();
        updateUI();
    }
}

// Afficher le profil
function showProfile(employeeId) {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
        // Le template littéral est correct. J'ai ajouté une vérification de la structure des données d'expérience.
        profileContent.innerHTML = `
            <div class="profile-header">
                <img src="${employee.photo}" alt="${employee.fullname}" class="profile-avatar">
                <div class="profile-info">
                    <h2>${employee.fullname}</h2>
                    <p><strong>Role:</strong> ${employee.role}</p>
                    <p><strong>Email:</strong> ${employee.email}</p>
                    <p><strong>Phone:</strong> ${employee.phone}</p>
                    <p><strong>Current Location:</strong> ${employee.assignedZone ? formatZoneName(employee.assignedZone) : 'Unassigned'}</p>
                </div>
            </div>
            <div class="profile-details">
                <div class="profile-section">
                    <h3>Work Experience</h3>
                    <div class="experience-list">
                        ${employee.experiences && Array.isArray(employee.experiences) && employee.experiences.length > 0
                            ? employee.experiences.map(exp => `
                                <div class="experience-item">
                                    <h4>${exp.company}</h4>
                                    <div class="experience-dates">${exp.startDate} - ${exp.endDate || 'Present'}</div>
                                    <p>${exp.description}</p>
                                </div>
                            `).join('')
                            : '<p>No experience recorded.</p>'
                        }
                    </div>
                </div>
            </div>
        `;
        profileModal.classList.add('active');
    }
}


// Update UI (mis à jour pour correspondre à l'HTML corrigé)
function updateUI() {
    if (!unassignedStaff) {
        console.error("L'élément 'unassignedStaff' est introuvable.");
        return;
    }

    // Mise à jour du personnel non assigné
    const unassigned = employees.filter(emp => !emp.assignedZone);
    unassignedStaff.innerHTML = '';

    if (unassigned.length === 0) {
        unassignedStaff.innerHTML = '<p class="no-staff">No unassigned staff.</p>';
    } else {
        unassigned.forEach(employee => {
            const staffItem = document.createElement('div');
            staffItem.className = 'staff-item';
            
            // Correction: Le bouton de suppression doit avoir son propre listener ou être géré par délégation
            staffItem.innerHTML = `
                <img src="${employee.photo}" alt="${employee.fullname}" class="staff-avatar">
                <div class="staff-info">
                    <div class="staff-name">${employee.fullname}</div>
                    <div class="staff-role">${employee.role}</div>
                </div>
                <button class="remove-from-list-btn" data-id="${employee.id}"> 
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            // Ouvrir le profil lors du clic sur l'élément (pas le bouton de suppression)
            staffItem.addEventListener('click', (event) => {
                // Empêcher l'événement de se propager au bouton de suppression
                if (!event.target.closest('.remove-from-list-btn')) { 
                    showProfile(employee.id);
                }
            });

            // Gérer le clic sur le bouton de suppression (si vous voulez supprimer l'employé)
            const removeBtn = staffItem.querySelector('.remove-from-list-btn');
            if (removeBtn) {
                removeBtn.addEventListener('click', (event) => {
                    event.stopPropagation(); // Empêcher d'ouvrir le profil
                    // Il semble que l'intention était de le supprimer de la liste, mais la fonction 'removeFromZone' est plus logique
                    removeFromZone(employee.id); 
                });
            }

            unassignedStaff.appendChild(staffItem);
        });
    }

    // Mise à jour des zones assignées (fonctionnalité non montrée, mais nécessaire pour la complétude)
    // Vider les zones et ajouter les employés assignés.
    // Exemple pour la zone 'conference':
    // document.getElementById('conferenceZone').innerHTML = employees.filter(emp => emp.assignedZone === 'conference').map(...)
}