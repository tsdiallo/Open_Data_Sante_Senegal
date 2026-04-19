# SPEC — Open Data Santé Sénégal

> Document consolidé. Source de vérité pour la refonte "urgence + orientation de soins".
> Annule et remplace les MVP précédents (démographie, épidémiologie, nettoyage pédagogique).

---

## 1. Vision produit

Plateforme web **pratique** pour le Sénégal entier, qui aide un utilisateur à :

1. trouver rapidement un établissement de santé autour de lui (GPS) ;
2. savoir quoi faire en cas d'urgence ou de malaise ;
3. appeler les bons numéros sans friction ;
4. consulter des conseils prudents de premiers secours et d'automédication.

**Mobile-first, sobre, rassurante, professionnelle, rapide.**

## 2. Périmètre

| Inclus | Exclu |
|---|---|
| Hôpitaux publics, cliniques privées, centres de santé | Démographie, recensements |
| Pharmacies + mode "de garde" | Épidémiologie générale |
| Ambulances publiques, SAMU, privées | Outil de diagnostic |
| Numéros d'urgence | Téléconsultation |
| Fiches urgence (AVC, cardiaque, paludisme, grippe) | Prescription |
| Questionnaire d'orientation (non-diagnostic) | Paiement |
| Premiers secours visuels | Stockage de données personnelles |
| Médicaments OTC avec précautions | |
| Tarifs indicatifs (officiel / observé / estimation) | |
| Admin local pour curation des données | |

## 3. Utilisateurs cibles & parcours critiques

**Personas :**
- **Grand public en stress** (accident, malaise, crise) : veut une action rapide, un numéro à appeler, un lieu à rejoindre.
- **Aidant** (parent, voisin) : cherche une pharmacie de garde, un hôpital ouvert, un geste de secours.
- **Admin bénévole** : corrige/complète les données, sans backend lourd.

**Parcours clés (≤3 taps) :**
- *Urgence vitale* → Home → bouton rouge "Appeler SAMU 1515" → `tel:` natif.
- *Autour de moi* → Home → bouton "Trouver près de moi" → géoloc → liste triée distance.
- *Pharmacie de garde* → bottom nav → Pharmacies → toggle "de garde" → appel.
- *Que faire ?* → bottom nav → Urgences → choix de situation → fiche.

## 4. Architecture UX

### Menu principal (9 entrées)

| Route | Label | Notes |
|---|---|---|
| `/` | Accueil | Hero + CTA urgence + 4 actions rapides |
| `/autour-de-moi` | Autour de moi | Géoloc + carte + liste distance |
| `/urgences` | Urgences | Grille fiches + entrée questionnaire |
| `/urgences/orientation` | (sous-route) | Questionnaire stepper |
| `/urgences/:type` | (sous-route) | Fiche urgence (AVC, cardiaque, paludisme, grippe) |
| `/hopitaux` | Hôpitaux / Cliniques | Filtres + liste + fiche |
| `/hopitaux/:id` | (sous-route) | Fiche établissement |
| `/pharmacies` | Pharmacies | Mode "de garde" toggle |
| `/ambulances` | Ambulances | Numéros en avant |
| `/medicaments` | Médicaments sans ordonnance | Par catégorie + disclaimers |
| `/tarifs` | Tarifs indicatifs | Badge fiabilité obligatoire |
| `/admin` | Admin | CRUD LocalStorage + export JSON |

### Navigation

- **Mobile** : bottom navigation 5 entrées (Accueil · Autour · **Urgences** rouge central · Pharmacies · Plus→drawer).
- **Desktop** : top navbar + sidebar compacte pour les 9 entrées.
- **FAB d'appel SAMU** sticky sur toutes les pages d'urgence.

## 5. Modules fonctionnels

### 5.1 Géolocalisation & recherche

- API Geolocation navigateur, opt-in explicite, fallback "choisir une région".
- Distance Haversine, tri croissant.
- Filtres : type, région, ville, spécialité, 24h/24, urgence, maternité, pédiatrie, cardio, neuro, trauma, réa, labo, imagerie, public/privé, de garde.
- Recherche texte libre : nom, commune, spécialité.
- Rayon configurable : 5, 10, 25, 50 km, national.

### 5.2 Fiche établissement

Champs : nom, type, statut public/privé, adresse, région, ville, lat/lng, téléphones[], services[], spécialités[], horaires, urgence, ambulance, maternité, source, updated_at, confidence.

Actions : **Appeler** (`tel:`), **Itinéraire** (Google Maps URL), **Partager** (Web Share API), **Signaler erreur** (mailto: ou form local).

### 5.3 Logique de recommandation

```
if urgence vitale:
  → afficher SAMU + établissement le plus proche avec urgence
elif spécialité recherchée trouvée dans rayon:
  → tri par distance puis confidence
elif spécialité introuvable localement:
  → élargir rayon automatiquement, afficher options avec badge "à confirmer"
else:
  → afficher liste régionale avec badge "contact recommandé avant visite"
```

### 5.4 Fiches d'urgence (4 minimum)

- **AVC** / **Douleur thoracique (cardiaque)** / **Paludisme** / **Grippe**.
- Pour chaque fiche :
  - signes d'alerte (liste courte, icônes)
  - ✅ à faire
  - ⛔ à ne PAS faire
  - quand appeler le 1515
  - type d'établissement à chercher
  - bouton "Appeler SAMU" permanent
- Sources : **OMS, Croix-Rouge, documents publics ministériels** citées.

### 5.5 Questionnaire d'orientation (non-diagnostic)

Stepper avec questions binaires/multiples :
conscience · respiration · douleur thoracique · paralysie unilatérale · fièvre forte · saignement · convulsions · trauma · adulte/enfant/femme enceinte.

Sortie : **niveau d'urgence** (rouge/orange/vert), geste immédiat, type de structure, CTA appel. Jamais "diagnostic".

### 5.6 Premiers secours visuels

Cartes courtes avec icônes (lucide-react) : PLS, saignement, fièvre, détresse respi, douleur thoracique, signes AVC, convulsions, déshydratation.

### 5.7 Médicaments OTC

Par catégorie : fièvre/douleur · rhume · diarrhée · plaie · brûlure · nausée · céphalée.

Pour chaque item : nom générique · usage courant · précautions · contre-indications majeures · âge minimum · message "consulter si aggravation".

**Interdits** pour douleur thoracique sévère, détresse respi, paludisme sévère, grossesse à risque, nourrisson à risque.

### 5.8 Tarifs indicatifs

Catégories : consultation, urgence, hospitalisation de base, ambulance, pharmacie.

Chaque ligne porte un **type de fiabilité** (officiel vérifié / observé / estimation) et une source URL.

### 5.9 Admin

- CRUD local via **LocalStorage** sur les datasets JSON (édition des champs).
- Historisation simple (dernière valeur + utilisateur+date).
- Export JSON pour commit dans le repo.
- Pas de backend, pas d'auth serveur (mot de passe local simple).
- Champs curation : `verified_by`, `verified_at`, `last_scraped_at`, `source_url`, `confidence_score`, `notes`.

## 6. Schéma de données (JSON normalisés)

```
src/data/
├── regions.json              # 14 régions + codes ISO
├── facilities.json           # hôpitaux, cliniques, centres
├── specialties.json          # référentiel de spécialités
├── pharmacies.json           # pharmacies + flag de_garde
├── ambulances.json           # SAMU + publiques + privées
├── emergency_numbers.json    # SAMU 1515, 17, 18, etc.
├── first_aid.json            # fiches urgence (AVC, cardiaque, palu, grippe)
├── otc_medicines.json        # médicaments sans ordonnance
├── tariffs.json              # tarifs indicatifs + type de fiabilité
└── sources.json              # catalogue des sources + confidence
```

**Champs communs curation** : `source_id`, `confidence` ∈ {`official`, `secondary`, `scraped`, `unverified`}, `updated_at`, `verified_by?`, `verified_at?`, `notes?`.

## 7. Stack technique (décidée)

- **React 18 + Vite + React Router v6**
- **Tailwind CSS** (pas de MUI — cf. audit)
- **Radix UI** primitives (Dialog, Drawer, Tabs, Toast, Popover, DropdownMenu)
- **lucide-react** (icônes)
- **react-leaflet + leaflet** (cartes, lazy-loaded)
- **Vitest** (tests unitaires)
- **LocalStorage** (admin)
- Déploiement **Netlify** (100% statique)

**Pas de runtime scraping** (incompatible statique). Les scripts d'ingestion s'exécutent **au build** ou manuellement :

```
scripts/
├── import-csv.js             # CSV → JSON normalisé
├── import-json.js            # JSON tiers → JSON interne
├── scrape/
│   ├── esante.js             # stub annuaire eSanté
│   ├── pharmacies-garde.js   # stub listes PDF/HTML
│   └── ambulances-privees.js # stub
└── dedupe.js                 # fusion par nom/phone/coords
```

## 8. UI/UX — exigences

- **Typographie** : Inter (body) + Fraunces (display) — déjà en place.
- **Palette** : brand vert `#00853F` · sun or `#E8B923` · clinic rouge `#E31B23` · sand `#faf7f0`.
- **Badges fiabilité** : officiel (vert), secondaire (sun), scrapé (orange), à vérifier (gris).
- **Cibles tactiles** ≥ 44×44 px, focus visibles, contrastes AA.
- **Dark mode** via `dark:` Tailwind, toggle simple (préférence LocalStorage).
- **États** : loading (skeleton), empty (illustration + CTA), error (disclaimer + retry).

## 9. Éthique & sécurité produit

- Aucun numéro, tarif ou spécialité inventé.
- Chaque fiche d'urgence porte : "**Ne remplace pas un avis médical. En cas de doute, appelez le 1515.**"
- Aucune suggestion OTC risquée pour urgences graves.
- Fiabilité toujours visible (badge).
- Aucun PII stocké, aucun tracker.

## 10. Tests unitaires (Vitest)

Fonctions critiques à couvrir :

- `haversineDistance(a, b)` : précision sur 3 chiffres.
- `normalizePhone(raw)` : conversion `+221 XX XXX XX XX`.
- `normalizeRegion(str)` : mapping casse/accents → code.
- `scoreConfidence(source)` : ordre officiel > secondaire > scrapé > unverified.
- `mergeFacilities(list)` : dédoublonnage par nom+phone+coords.
- `recommendFacility(query, user_location)` : règles de la section 5.3.

## 11. Plan d'exécution (11 phases)

| # | Phase | Livrable principal |
|---|---|---|
| 1 | **Purge + réaxage** | Suppression démo/épidémio/nettoyage, routes vers 9 pages, placeholders |
| 2 | **Design tokens + primitives** | Radix, dark mode, trust badges, emergency button |
| 3 | **Layout responsive** | Bottom nav mobile, drawer desktop, FAB urgence |
| 4 | **Schéma données** | 10 JSON normalisés avec champs curation |
| 5 | **Accueil + Autour de moi** | Hero CTA, géoloc, carte, tri distance |
| 6 | **Module Urgences** | 4 fiches + questionnaire stepper |
| 7 | **Hôpitaux + fiche + recommandation** | Liste filtres + fiche + logique |
| 8 | **Pharmacies + Ambulances** | Mode garde + numéros en avant |
| 9 | **OTC + Tarifs + Admin** | Catégories, tarifs, CRUD local |
| 10 | **Tests + scripts ingestion** | Vitest + scripts CSV/JSON/stubs scrape |
| 11 | **Polish + docs** | Skeletons, empty/error states, README maintenance |

## 12. Livrables

- Application React déployée sur Netlify.
- 10 fichiers JSON normalisés et renseignés.
- Scripts d'ingestion documentés dans `/scripts/`.
- Suite Vitest sur les utilitaires critiques.
- `README.md` : installation, dev, build, ingestion, curation admin, contribution données.
- Ce document (`SPEC.md`) maintenu comme source de vérité.

## 13. Non-négociables

- ⛔ Aucune donnée inventée (numéro, tarif, spécialité, horaire).
- ⛔ Pas de diagnostic — uniquement de l'orientation.
- ✅ Disclaimer visible sur chaque écran urgence.
- ✅ Fiabilité visible partout (badge).
- ✅ Mobile-first, cibles ≥ 44 px.
- ✅ Pas de PII, pas de tracker.
