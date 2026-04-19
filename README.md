# Open Data Santé Sénégal

Plateforme web en français pour **explorer, visualiser et comprendre** des jeux
de données publics de santé, démographie et infrastructures sanitaires du
Sénégal. MVP pédagogique, 100 % statique, déployable sur Netlify en quelques
minutes.

## Ce que propose le site

- **Épidémiologie** — cas hebdomadaires de maladies surveillées (paludisme,
  dengue) par région, avec filtres et courbes.
- **Démographie** — population par région (RGPH-5), superficie, densité.
- **Hôpitaux & pharmacies** — annuaire filtrable + pharmacies de garde.
- **Nettoyage** — page pédagogique qui montre comment une donnée brute
  devient une donnée lisible (avant/après + code des utilitaires).

## Stack

| Rôle               | Outil                                   |
| ------------------ | --------------------------------------- |
| Build              | Vite                                    |
| UI                 | React 18 + React Router v6              |
| Styles             | Tailwind CSS                            |
| Graphiques         | Recharts                                |
| Données            | JSON statiques (`src/data/`)            |
| Déploiement        | Netlify (SPA, redirect `/* → /index.html`) |

Pas de backend, pas de store global, pas de CMS.

## Démarrage local

```bash
# 1. installer les dépendances
npm install

# 2. lancer le serveur de dev (http://localhost:5173)
npm run dev

# 3. générer le build de production
npm run build

# 4. prévisualiser le build
npm run preview
```

## Structure

```
src/
├── layouts/DashboardLayout.jsx   # Navbar + Outlet + Footer
├── pages/                        # Home, Epidemiologie, Demographie,
│                                 # Infrastructures, Nettoyage, NotFound
├── components/
│   ├── ui/                       # KpiCard, ChartCard, DataTable,
│   │                             # FilterBar, SourceBadge, InfoTooltip,
│   │                             # CodeBlock, Navbar, Footer
│   └── charts/                   # BarByRegion, LineTimeSeries
├── data/                         # regions, epidemio, etablissements,
│   └── raw/                      # pharmacies + échantillon brut
├── utils/                        # cleaning.js, format.js
└── hooks/useCleanedData.js       # charge + nettoie un dataset
```

## Sources de données

Les fichiers JSON de `src/data/` sont **pré-agrégés et pré-nettoyés** à
partir des références publiques ci-dessous. Pour le MVP, aucune API temps
réel n'est consommée : les volumes sont réduits, les sources citées sur
chaque graphique.

| Thème            | Référence                                                     |
| ---------------- | ------------------------------------------------------------- |
| Démographie      | ANSD / ANADS — RGPH-5                                         |
| Épidémiologie    | information.sante.gouv.sn — bulletins hebdomadaires (simulés) |
| Établissements   | Annuaire eSanté / Ministère de la Santé                       |
| Pharmacies       | Listes pharmacies de garde (Ordre des Pharmaciens)            |

## Déploiement Netlify

### Option 1 — via l'interface Netlify (recommandée)

1. Pousser le dépôt sur GitHub.
2. Sur [app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git**.
3. Sélectionner le dépôt. Netlify lit automatiquement `netlify.toml` :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
4. Cliquer sur **Deploy**. Le premier build prend ~1 min.

### Option 2 — via la CLI

```bash
npm install -g netlify-cli
netlify login
netlify init       # lier le dépôt à un site Netlify
netlify deploy --prod
```

### Redirects SPA

Déjà configurés dans `netlify.toml` :

```toml
[[redirects]]
  from = "/*"
  to   = "/index.html"
  status = 200
```

Sans cela, un rafraîchissement sur `/epidemiologie` renvoie 404.

## Workflow Git

- Branche de développement : `claude/senegal-health-data-mvp-6Fqyp`.
- Commits par phase, messages descriptifs.
- Pas de force push, pas de merge main sans PR.

## Limites connues du MVP

- Données simulées côté épidémiologie (pas d'API temps réel publique
  facilement consommable).
- Pas de carte Leaflet pour les établissements — reportée à une phase
  ultérieure (la donnée `lat/lng` est déjà présente).
- Pas d'i18n (mono-langue français).
- Pas de tests automatisés.

## Roadmap courte

1. Ajouter une carte `react-leaflet` sur la page Infrastructures.
2. Ajouter une pyramide des âges (quand une source réaliste est trouvée).
3. Importer davantage de semaines épidémio + plusieurs années.
4. Bouton « télécharger le CSV nettoyé » sur chaque tableau.

## Licence

Voir `LICENSE`.
