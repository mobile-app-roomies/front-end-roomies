# 📋 Cahier des Charges - Roomies
### Application de Gestion de Colocation

> **Version:** 1.0 - POC  
> **Date:** Septembre 2025  
> **Équipe:** Roomies Dev Team  

---

## 🎯 Vue d'ensemble du projet

### Objectif
Créer une application mobile ludique et intuitive pour faciliter la gestion quotidienne d'une colocation, en rendant les tâches ménagères fun et motivantes grâce à un système de gamification.

### Vision
Transformer les corvées en défis amusants et récompenser l'entraide entre colocataires pour créer une harmonie dans le logement partagé.

### Stack Technique
- **Frontend:** React Native + Expo
- **Backend:** Supabase (Auth, Database, Realtime)
- **Architecture:** Atomic Design
- **State Management:** Zustand
- **UI:** React Native Paper
- **Offline:** Expo SQLite + PWA

---

## 🚀 Fonctionnalités Core (MVP)

### 1. 🔐 **Authentification & Onboarding**
- [x] OAuth2 avec Google/GitHub via expo-auth-session
- [x] Écran d'onboarding attrayant avec présentation des features
- [x] Création/Rejoindre une colocation via code d'invitation
- [x] Profil utilisateur avec avatar et préférences

### 2. 🏠 **Dashboard Principal**
- [x] Vue d'ensemble de la colocation
- [x] Widget météo du jour (pour les corvées extérieures)
- [x] Notifications des tâches du jour
- [x] Balance des tickets en temps réel
- [x] Quick actions (scanner un reçu, valider une tâche)

### 3. 🧹 **Système de Tâches (Chore Board)**
- [x] Création de tâches avec difficulté (Easy/Medium/Hard)
- [x] Attribution automatique ou manuelle
- [x] Validation par photo avant/après
- [x] Système de rotation équitable
- [x] Rappels push notifications

### 4. 🎫 **Système de Tickets (Gamification)**
- [x] Gain de tickets selon la difficulté des tâches
- [x] Bonus pour les tâches accomplies rapidement
- [x] Malus pour les retards
- [x] Historique des transactions
- [x] Wallet virtuel avec animation de pièces

### 5. 🎁 **Système de Récompenses**
- [x] Catalogue de récompenses personnalisables
- [x] Échange de tickets contre des privilèges
- [x] Exemples : "Skip une corvée", "Choisir le film du soir", "Priorité douche"
- [x] Création de récompenses custom par la coloc

---

## 🌟 Fonctionnalités Must-Have

### 6. 💬 **Communication & Social**
- [x] Chat de groupe intégré avec réactions emoji
- [x] Système de vote pour les décisions communes
- [x] Tableau d'annonces pour les infos importantes
- [x] Mentions @ pour les notifications ciblées

### 7. 💰 **Gestion des Dépenses Communes**
- [x] Scan de tickets de caisse (OCR)
- [x] Répartition automatique des dépenses
- [x] Balance des comptes en temps réel
- [x] Rappels de remboursement
- [x] Export mensuel des comptes

### 8. 📅 **Planning & Organisation**
- [x] Calendrier partagé des événements
- [x] Réservation des espaces communs
- [x] Planning des courses avec liste collaborative
- [x] Gestion des absences/vacances

### 9. 🌙 **Modes & Accessibilité**
- [x] Mode sombre/clair avec transition smooth
- [x] Support offline complet avec sync
- [x] PWA pour utilisation web
- [x] Multilingue (FR/EN pour commencer)

---

## 🎮 Fonctionnalités Fun & Innovantes (POC Killer Features)

### 10. 🏆 **Battle Mode - Défis entre Colocs**
- [ ] Défis hebdomadaires (ex: "Speedrun nettoyage")
- [ ] Tournois de rapidité sur les tâches
- [ ] Système de paris en tickets
- [ ] Achievements débloquables avec badges
- [ ] Leaderboard animé avec effets visuels

### 11. 🎰 **Roulette des Corvées**
- [ ] Roue de la fortune animée pour l'attribution aléatoire
- [ ] Mode "Double or Nothing" pour les courageux
- [ ] Échange de corvées via mini-jeux (Pierre-Papier-Ciseaux)
- [ ] Carte "Joker" mensuelle pour skip une corvée

### 12. 🤖 **Assistant IA "RoomBot"**
- [ ] Chatbot pour résoudre les conflits
- [ ] Suggestions de répartition équitable
- [ ] Tips de nettoyage et organisation
- [ ] Blagues et encouragements quotidiens
- [ ] Rappels personnalisés selon les habitudes

### 13. 🎭 **Modes Spéciaux Événementiels**
- [ ] "Mode Soirée" : gestion automatique du rangement post-event
- [ ] "Mode Exam" : allègement des tâches pour les étudiants
- [ ] "Mode Invité" : attribution temporaire de tâches
- [ ] Thèmes saisonniers (Halloween, Noël, etc.)

### 14. 📸 **Stories de Coloc**
- [ ] Stories façon Instagram des moments de vie
- [ ] Time-lapse automatique du ménage
- [ ] Album photo partagé de la coloc
- [ ] Mèmes generator intégré pour l'humour

### 15. 🎵 **Intégrations Fun**
- [ ] Playlist Spotify collaborative pour le ménage
- [ ] Minuteur Pomodoro pour les sessions de rangement
- [ ] Son effects et animations lors des accomplissements
- [ ] Widget iOS/Android sur l'écran d'accueil

### 16. 🌱 **Éco-Score de la Coloc**
- [ ] Tracking de la consommation (eau, électricité)
- [ ] Challenges écologiques avec récompenses
- [ ] Tips pour réduire l'empreinte carbone
- [ ] Badges "Green Roomie" à débloquer

### 17. 🍕 **Food Manager**
- [ ] Inventaire intelligent du frigo (avec dates de péremption)
- [ ] Système de "dibs" sur la nourriture
- [ ] Recettes collaboratives avec les restes
- [ ] Notation des plats cuisinés ensemble

### 18. 🎲 **Mini-Jeux Intégrés**
- [ ] Quiz quotidien sur la coloc (qui connaît le mieux ses colocs?)
- [ ] Memory game avec les photos de profil
- [ ] Snake game où on ramasse des corvées
- [ ] Puzzle collaboratif débloquant des récompenses

### 19. 🔮 **Prédictions & Stats**
- [ ] "Coloc du mois" basé sur les stats
- [ ] Prédictions de qui va faire quoi
- [ ] Graphiques de performance personnelle
- [ ] Heat map des zones les plus/moins nettoyées

### 20. 🎊 **Système de Célébrations**
- [ ] Confettis animés pour les milestones
- [ ] Notifications d'anniversaire automatiques
- [ ] Trophées 3D rotatifs à collectionner
- [ ] Hall of Fame des meilleures performances

---

## 📱 Spécifications Techniques

### Architecture
```
src/
├── components/
│   ├── atoms/        (Button, Input, Icon...)
│   ├── molecules/    (Card, FormField, ListItem...)
│   ├── organisms/    (Header, ChoreCard, RewardModal...)
│   ├── templates/    (MainLayout, AuthLayout...)
│   └── pages/        (Home, Chores, Wallet, Settings...)
├── hooks/            (useAuth, useChores, useTickets...)
├── services/         (api, storage, notifications...)
├── navigation/       (Stack & Tab navigators)
├── store/           (Zustand stores)
├── styles/          (theme, colors, spacing...)
└── utils/           (helpers, constants...)
```

### Fonctionnalités PWA
- Service Worker pour cache offline
- Manifest.json pour installation
- Push notifications natives
- Synchronisation en arrière-plan
- Web Vitals monitoring

### Sécurité
- Tokens stockés dans SecureStore
- PKCE flow pour OAuth
- Validation côté serveur
- Rate limiting API
- Chiffrement des données sensibles

---

## 🚦 Roadmap de Développement

### Phase 1: Foundation (Semaine 1-2)
- Setup environnement & architecture
- Authentification OAuth2
- Navigation de base
- Design system (atoms & molecules)

### Phase 2: Core Features (Semaine 3-4)
- CRUD des tâches
- Système de tickets
- Dashboard principal
- Profils utilisateurs

### Phase 3: Gamification (Semaine 5-6)
- Système de récompenses
- Animations et feedbacks
- Notifications push
- Leaderboard

### Phase 4: Features Fun (Semaine 7-8)
- Roulette des corvées
- Battle mode
- Mini-jeux
- Stories de coloc

### Phase 5: Polish & Deploy (Semaine 9-10)
- Tests utilisateurs
- Optimisations performance
- PWA setup complet
- Déploiement stores

---

## 🎨 Guidelines UI/UX

### Principes de Design
- **Coloré & Ludique:** Palette vive et joyeuse
- **Micro-interactions:** Animations satisfaisantes partout
- **Mobile-first:** Optimisé pour l'usage au pouce
- **Feedback instantané:** Chaque action a une réaction visuelle
- **Accessible:** Support des lecteurs d'écran, contraste élevé

### Palette de Couleurs
```css
--primary: #6B5ECD      /* Purple fun */
--secondary: #FFC107    /* Gold tickets */
--success: #4CAF50      /* Green validation */
--danger: #FF5252       /* Red alerts */
--background: #F5F7FA   /* Light grey */
--surface: #FFFFFF      /* Cards white */
```

### Animations Clés
- Swipe pour valider/reporter une tâche
- Pull-to-refresh avec animation liquide
- Transitions de page fluides
- Confettis pour les accomplissements
- Shake effect pour les rappels

---

## 📊 KPIs de Succès

### Métriques d'Engagement
- Taux de complétion des tâches > 80%
- Utilisation quotidienne > 70% des users
- Temps moyen dans l'app > 5 min/jour
- Taux de rétention J30 > 60%

### Métriques de Satisfaction
- NPS Score > 8/10
- Review App Store > 4.5 étoiles
- Taux de recommandation > 75%
- Réduction des conflits de coloc de 50%

---

## 🔧 Maintenance & Évolution

### Support Continu
- Updates de sécurité mensuels
- Nouvelles features tous les 2 mois
- Support utilisateur via chat in-app
- Analytics pour amélioration continue

### Idées Futures (V2)
- Intégration domotique (Alexa, Google Home)
- Marketplace de templates de corvées
- Mode famille/couple
- API ouverte pour intégrations tierces
- Version entreprise pour espaces de coworking

---

## 📝 Notes Finales

Ce cahier des charges vise à créer une application qui transforme réellement la vie en colocation. L'accent est mis sur le fun et la gamification pour rendre les tâches ménagères moins pénibles et créer une vraie cohésion de groupe.

**Motto du projet:** *"Faire de la colocation un jeu où tout le monde gagne!"* 🎮🏠

---

*Document créé le 24/09/2025 - Version POC*
