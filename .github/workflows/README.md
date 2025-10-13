# 🤖 GitHub Actions Workflows

Ce dossier contient tous les workflows automatisés du projet.

## 📋 Vue d'ensemble

| Workflow | Fichier | Déclencheur | Description |
|----------|---------|-------------|-------------|
| 🤖 **AI Code Review** | `ai-code-review.yml` | PRs → `main` | Review IA approfondie (GPT-4o) |
| ✅ **Code Quality** | `code-quality.yml` | PRs + Push | ESLint, Prettier, TypeScript, Tests |
| 📊 **SonarCloud** | `sonarcloud.yml` | Push → `main`/`staging` | Analyse de qualité + couverture |
| 🔄 **Auto PR to Staging** | `auto-pr-to-staging.yml` | Push branches | PR automatique vers staging |
| 🚀 **Auto PR Staging → Main** | `auto-pr-staging-to-main.yml` | Push → `staging` | PR automatique vers main |

---

## 🤖 AI Code Review

**Fichier:** `ai-code-review.yml`

### Déclenchement
- Pull Requests vers `main` uniquement
- Seulement sur fichiers importants (app, components, contexts, hooks, lib, constants)

### Fonctionnalités
- ✅ Review IA approfondie (GPT-4o)
- ✅ Analyse des commits de la PR
- ✅ Suivi détaillé des coûts
- ✅ Filtrage intelligent par fichiers
- ✅ Labels automatiques basés sur l'analyse
- ✅ Suggestions de code et best practices
- ✅ Détection de bugs et problèmes de sécurité

### Coût
~$0.01-0.30 par review

### Secrets requis
- `OPENAI_API_KEY` - Clé API OpenAI
- `TOKEN_GITHUB` - Personal Access Token GitHub

---

## ✅ Code Quality

**Fichier:** `code-quality.yml`

### Déclenchement
- Pull Requests (toutes branches)
- Push (sauf `main` et `staging`)

### Vérifications
- ESLint
- Prettier formatting
- TypeScript compilation
- Tests unitaires

### Installation dépendances
Utilise `npm ci --legacy-peer-deps`

---

## 📊 SonarCloud Scan

**Fichier:** `sonarcloud.yml`

### Déclenchement
- Push vers `main`
- Push vers `staging`

### Analyses
- Qualité du code
- Bugs potentiels
- Vulnérabilités de sécurité
- Code smells
- Couverture de tests

### Secrets requis
- `SONARCLOUD_KEY`
- `TOKEN_GITHUB`

### Configuration
- Project Key: `mobile-app-roomies_front-end-roomies`
- Organization: `mobile-app-roomies`

---

## 🔄 Auto PR to Staging

**Fichier:** `auto-pr-to-staging.yml`

### Déclenchement
Push sur branches (sauf `main`, `staging`, branches système)

### Comportement
Crée automatiquement une PR vers `staging` pour faciliter le workflow.

---

## 🚀 Auto PR Staging → Main

**Fichier:** `auto-pr-staging-to-main.yml`

### Déclenchement
Push vers `staging`

### Comportement
Crée automatiquement une PR de `staging` vers `main` après validation.

---

## 🔐 Secrets GitHub requis

Configurez ces secrets dans **Settings** → **Secrets and variables** → **Actions** :

| Secret | Description | Utilisé par |
|--------|-------------|-------------|
| `OPENAI_API_KEY` | Clé API OpenAI | AI Review Light, AI Review Deep |
| `TOKEN_GITHUB` | Personal Access Token | AI Reviews, Auto PRs |
| `SONARCLOUD_KEY` | Token SonarCloud | SonarCloud Scan |

---

## 💰 Gestion des coûts

### Stratégie d'optimisation

1. **Review légère sur staging** (GPT-4o-mini)
   - Coût faible
   - Feedback rapide
   - Toutes les PRs

2. **Review approfondie sur main** (GPT-4o)
   - Coût plus élevé
   - Analyse détaillée
   - Seulement fichiers importants

3. **Filtrage par fichiers**
   - Ignore assets, docs, config
   - Focus sur le code métier

### Estimation mensuelle

Avec ~10 PRs vers main/mois :
- AI Review (10 PRs) : ~$1.50
- **Total : ~$1.50/mois**

---

## 🎯 Flux de travail recommandé

```
Feature branch
    ↓
    ├─→ Push
    │   └─→ Auto PR to Staging
    │
    ↓ PR créée automatiquement
    │
staging (✅ Code Quality)
    ↓
    ├─→ Merge
    │   └─→ Auto PR Staging → Main
    │
    ↓ PR créée automatiquement
    │
main (🤖 AI Review + 📊 SonarCloud)
    ↓
Production
```

---

## 🛠️ Maintenance

### Désactiver temporairement un workflow

Commentez la section `on:` ou ajoutez :
```yaml
if: false
```

### Tester localement

```bash
# ESLint
npm run lint

# Prettier
npm run format:check

# TypeScript
npm run typecheck

# Tests
npm test

# Tests avec couverture
npm run test:coverage
```

---

## 📚 Documentation

- [SonarCloud](./../SONARCLOUD.md)
- [GitHub Actions](https://docs.github.com/en/actions)
- [OpenAI API](https://platform.openai.com/docs)

---

## 🆘 Support

En cas de problème :
1. Vérifiez les secrets GitHub
2. Consultez les logs du workflow
3. Vérifiez les quotas API (OpenAI, GitHub)
4. Contactez l'équipe DevOps
