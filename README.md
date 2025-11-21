# WorkSphere - Virtual Workspace

## 📋 Description
Application web interactive de gestion visuelle du personnel permettant d'ajouter, déplacer ou supprimer des employés sur un plan d'étage en temps réel.

## 🚀 Fonctionnalités principales
- ✅ Gestion visuelle des employés sur plan d'étage
- ✅ Restrictions intelligentes par rôle et zone
- ✅ Interface responsive (desktop, tablette, mobile)
- ✅ Ajout/suppression d'employés en temps réel
- ✅ Validation automatique des règles métier

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
```
WorkSphere/
├── index.html
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animations.css
├── js/
│   ├── app.js
│   ├── employees.js
│   ├── zones.js
│   └── storage.js
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

## 🚀 Installation

```bash
# Cloner le repository
git clone https://github.com/ayanakkabi1/Workspher-project.git

# Ouvrir l'application
cd WorkSphere-Virtual-Workspace
# Ouvrir index.html dans un navigateur
```

## 📱 Responsive Design
- **Mobile** : ≤ 767px
- **Tablette** : 768px - 1023px
- **Desktop** : ≥ 1024px

## 🎨 Design System
- **Couleurs** : Palette moderne avec vert, orange, rouge
- **Typographie** : Police moderne et lisible
- **Animations** : Transitions CSS fluides
- **Icônes** : Système d'icônes intuitif

## 🔧 Fonctionnalités techniques
- [x] Drag & Drop des employés
- [x] Validation en temps réel
- [x] Stockage local des données
- [x] Recherche et filtrage
- [x] Profils détaillés employés

## 📊 Zones disponibles
1. Salle de conférence
2. Réception
3. Salle des serveurs
4. Salle de sécurité
5. Salle du personnel
6. Salle d'archives

## 👥 Rôles supportés
- Manager
- Réceptionniste
- Technicien IT
- Agent de sécurité
- Personnel de nettoyage
- Développeur
- Designer

## 🔒 Validation des règles
Chaque employé ne peut être placé que dans les zones autorisées selon son rôle, avec des limites de capacité par zone.
