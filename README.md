AWSOME APP

Need to have:
installed postgres 13+
postgres db and user
node 16+


How to run:
clone project

add your db configuration to
```
backend/pg/connection.js
```
```
cd backend
npm install
node index.js
```
if you want to generate tables run
```
node index.js initAll
```
try not to initAll more than once as it will create about 300 entries

run frontend
```
cd frontend
npm install
npm run dev
```