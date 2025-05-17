# TODO


Pour la clé HMAC 


---

### Quel résultat ?

* **Entretien** : le recruteur clone → `yarn start:dev` → tout marche (clé auto-générée ou `.env` simple).
* **Prod / CI** : on fixe `HMAC_SECRET` dans les secrets GitHub, Vault, etc.
* **Sécurité** : plus de constante en clair committée, mais tu fournis quand même un fallback pratique.

---

## TL;DR

1. **Ajoute** `HMAC_SECRET_TOKEN` et un provider `useFactory` qui :
    * lit `process.env.HMAC_SECRET`, ou
    * génère `randomBytes(32).toString('hex')` si absent.
2. **Injecte** ce token dans `HmacSignerAdapter`.
3. **Fournis** `.env.example` pour que le reviewer puisse mettre sa propre clé.

Tu combines ainsi la simplicité d’une clé toute prête pour l’évaluateur et les bonnes pratiques de sécurité pour un vrai déploiement.


```bash
git clone …
cd riot-crypto-api
cp .env.example .env           # facultatif, une clé aléatoire sera générée sinon
yarn install
yarn start:dev


Les tests 
yarn test 
yarn test:e2e  
yarn test:unit
Isolation : les E2E ont souvent un timeout, des logs
verbeux et ne doivent pas polluer la couverture unitaire.
Rapidité : yarn test:unit tourne en < 1 s, idéal en TDD.
CI : yarn test reste la cible par défaut, combinant les deux suites