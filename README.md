Transformers

Instaliranje aplikacije: npm install .. pokretanje.. npm run start. Default mod je development, može se promijeniti u production u .env
Production .js fajlovi su već generirani unutar foldera dist/

Aplikacija je napisana u Vue/Nodejs/Express/Bootstrap kombinaciji tehnologija. Za razvoj korišten je Webpack middleware.
Aplikacija je 2-way reactive, sve promjene vide se bez refreshanja, routing stranica je u front-endu
-----------------

FUNKCIONIRANJE
- 2-way reactive promjena statusa Transformera
- unos novog i editiranje postojećeg (klikom na naziv), pri čemu su promjene tipa i modela vidljive reaktivno. Default status novog je OK
- klikom na naslov 'Transformers' naizmjenično se mijenja sortanje kronološki i abecedno
-----------------

TEHNIKALIJE
Aplikacija sadrži 650 linija koda. Za UI koristi Bootstrap uz customiziranje nekih featuresa poput Google fonta Raleway, plave pozadine, bijelih default slova itd - uz korištenje .scss (fajlovi _moj.scss i _mojfont.scss unutar node_modules/bootstrap/scss). Promjene se rađene na način da ne mijenjaju originalne fajlove pa se Bootstrap može nesmetano nadograđivati na buduće verzije.

Važno - pri razvoju korišten je Node 10.15.1 (na 64-bit Win sistemu, što je za neke module bitno). Npr kod pokretanja izrade distribucijske verzije aplikacije sa.. npm run build .. javlja grešku jer novi vue-loader nije dovoljno kompatibilan sa novom verzijom Node. Vraćanje na prethodnu verziju vue-loader modula smanjuje grešku ali ne do kraja. No build radi normalno, objavljene greške mogu se zanemariti. Ako se koristi Node V10 i veći, trenutno (2 mj. 2019) ne instalirati vue-loader noviji od 14.0.0 jer u development modu neće kompajlirati Single File Components i scss.
------------------

NAČIN RAZVOJA
Single Page Application, sve su funkcije dvosmjerno reaktivne. Korištene su Vue Single File Components i Vue router za front-end routing. Back-end služi za API i vezu sa podacima (db.json). Odvojeno je napravljena logika View/Model. Server fajl je server.js a front end src/index.js

Glavna View funkcionalnost napravljena je u Home.vue modulu, index.js renderira main stranicu, dok App.vue služi kao baza za cijeli vizuelni dio sajta (kao  html <body>) i postavljanje eventualne master funkcionalnosti (npr top menu). Kompletan kod je izdašno komentiran tako da je lako vidjeti funkcioniranje pojedinih dijelova.

Data fajlu db.json dodan je counter "transId" koji svakom novom unosu Transformera daje novi id, bez obzira da li su neki stari unosi izbrisani. Ako se brišu unosi ručno transId treba postaviti na broj jednak zadnjem najvećem id broju postojećih transformera (nije uvjet ali je logičnije).

Podaci se između modula razmjenjuju pomoću router-link sa props.