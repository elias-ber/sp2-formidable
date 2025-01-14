
# 📋 Application de Création de Formulaire

Cette application permet de créer, gérer et intégrer des formulaires en ligne, similaire à Google Forms ou TypeForm. Elle est construite avec **React.js** pour le frontend et **MySQL** pour le backend.

## 🌟 Fonctionnalités

- **📝 Création de Formulaires** : Créez des formulaires personnalisés avec différents types de questions (texte, choix multiples, cases à cocher, etc.).
- **🔧 Gestion des Formulaires** : Gérez les formulaires, modifiez-les et consultez les réponses.
- **🌐 Intégration des Formulaires** : Intégrez les formulaires créés dans des pages externes via un lien ou un code d'intégration (`embed`).
- **📊 Réponses aux Formulaires** : Collectez et consultez les réponses soumises par les utilisateurs.

## ⚙️ Technologies

- **Frontend** : React.js
- **Backend** : Node.js avec Express.js
- **Base de données** : MySQL
- **Authentification** : JWT pour la gestion des utilisateurs
- **API REST** : Permet de communiquer entre le frontend et le backend
- **Lien/Embed** : Intégration des formulaires via URL ou code d'intégration sur d'autres pages

## 📍 Fonctionnalité d'Intégration (Embed)

Les utilisateurs peuvent intégrer un formulaire dans une page externe via un lien ou un code d'intégration.

- **Lien d'intégration** : 
  Vous pouvez intégrer un formulaire en utilisant un lien de la forme :  
  `http://votresite.com/embed/idForm/idHtmlCible`.

- **Code d'intégration (Embed)** : 
  Vous pouvez également récupérer un code HTML d'intégration pour insérer le formulaire directement dans une page externe.

## 🛠️ Types de Champs dans un Formulaire

Lors de la création d'un formulaire, vous pouvez ajouter différents types de champs pour personnaliser l'expérience utilisateur.

### 1. **Champ Texte (Input)** 🖊️
Permet à l'utilisateur de répondre par une courte phrase ou un mot.

- Exemple de question : *Quel est votre prénom ?*

### 2. **Paragraphe (Textarea)** 📄
Permet à l'utilisateur de répondre par un texte plus long.

- Exemple de question : *Racontez-nous votre expérience avec ce produit.*

### 3. **Choix Multiple (Radio Buttons)** 🔘
Permet à l'utilisateur de choisir une seule option parmi plusieurs.

- Exemple de question : *Quel est votre genre ?*
  - Homme
  - Femme
  - Autre

### 4. **Cases à Cocher (Checkboxes)** ☑️
Permet à l'utilisateur de sélectionner plusieurs options parmi une liste.

- Exemple de question : *Quelles technologies maîtrisez-vous ?*
  - JavaScript
  - Python
  - React
  - Node.js

### 5. **Liste Déroulante (Dropdown)** ⬇️
Permet à l'utilisateur de choisir une option parmi une liste déroulante.

- Exemple de question : *Quel est votre pays ?*

### 6. **Date (Date Picker)** 📅
Permet à l'utilisateur de sélectionner une date.

- Exemple de question : *Quand souhaitez-vous être contacté ?*

### 7. **Téléchargement de Fichier (File Upload)** 📂
Permet à l'utilisateur de télécharger un fichier.

- Exemple de question : *Veuillez télécharger votre CV.*

### 8. **Échelle de Notation (Rating)** ⭐️
Permet à l'utilisateur de donner une note à un élément.

- Exemple de question : *Comment évaluez-vous notre service ?*
  - 1 étoile - Très mauvais
  - 5 étoiles - Excellent

### 9. **Numérique (Number Input)** 🔢
Permet à l'utilisateur de saisir un nombre.

- Exemple de question : *Quel âge avez-vous ?*

### 10. **Heure (Time Picker)** ⏰
Permet à l'utilisateur de sélectionner une heure spécifique.

- Exemple de question : *À quelle heure souhaitez-vous être contacté ?*

### 11. Matrice de choix


## 🧑‍🤝‍🧑 API

### 1. Créer un formulaire

- **Endpoint** : `POST /api/formulaire`
- **Corps** :

  ```json
  {
    "titre": "Mon Formulaire",
    "questions": [
      {
        "type": "texte",
        "question": "Quel est votre prénom ?"
      },
      {
        "type": "choix",
        "question": "Quel est votre genre ?",
        "options": ["Homme", "Femme", "Autre"]
      }
    ]
  }


-   **Réponse** :
    ```json
    {
      "idForm": 1,
      "message": "Formulaire créé avec succès"
    }
    ```
    

### 2. Obtenir un formulaire par ID

-   **Endpoint** : `GET /api/formulaire/:idForm`
-   **Réponse** :
    
    ```json
    {
      "idForm": 1,
      "titre": "Mon Formulaire",
      "questions": [...]
    }
    ```

### 3. Soumettre les réponses

-   **Endpoint** : `POST /api/formulaire/:idForm/reponses`
-   **Corps** :
    
    ```json
    {
      "reponses": [
        "John",
        "Homme"
      ]
    }
    
    ```

-   **Réponse** :
    
    ```json
    {
      "message": "Réponses soumises avec succès"
    } 
    ```
  
