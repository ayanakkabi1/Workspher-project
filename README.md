# 🏢 WorkSphere - Virtual Workspace

## 📋 Description
Application web interactive de gestion visuelle du personnel permettant d'ajouter, déplacer ou supprimer des employés sur un plan d'étage en temps réel.

## 🚀 Fonctionnalités principales
- ✅ **Gestion visuelle** des employés sur plan d'étage
- ✅ **Restrictions intelligentes** par rôle et zone  
- ✅ **Interface responsive** (desktop, tablette, mobile)
- ✅ **Ajout/suppression** d'employés en temps réel
- ✅ **Validation automatique** des règles métier

## 🎯 Règles métier
- 🚫 **Réception** → Uniquement Réceptionnistes
- 🖥️ **Salle serveurs** → Uniquement Techniciens IT
- 🔒 **Salle sécurité** → Uniquement Agents de sécurité
- 👑 **Manager** → Accès à toutes les zones
- 🧹 **Nettoyage** → Partout sauf Archives

## 🛠️ Technologies
- **Frontend** : HTML5, CSS3, JavaScript vanilla
- **Layout** : CSS Grid & Flexbox
- **Responsive** : Mobile-first design
- **Stockage** : LocalStorage

## 📁 Structure du projet
WorkSphere/
├── index.html
├── css/
│ ├── style.css
│ ├── responsive.css
│ └── animations.css
├── js/
│ ├── app.js
│ ├── data.js
│ ├── zones.js
│ └── storage.js
├── assets/
│ ├── images/
│ └── icons/
└── README.md

## 🚀 Installation
```bash
# Cloner le repository
git clone https://github.com/ayanakkabi1/Workspher-project.git

# Ouvrir l'application
cd WorkSphere-Virtual-Workspace
# Ouvrir index.html dans un navigateur