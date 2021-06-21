Ce document vous éxplique les différentes parties du projet dans sa globalité.

Tout d'abord il s'agit d'un projet de gestion des roles avec angular. 

Pour cela, nous avons une partie front-end et une partie Backend.

1-La partie front-end est faite avec Angular. Pour utiliser ce projet, il faut installer :
- La version 14 de nodejs
- La version 11 de angularjs
- la version 3.3.7 de bootstrapp

Apres avoir cloner le projet, vous pouvez taper les commandes suivantes dans votre repertoire de projet:
npm init 
npm install
ng serve --open

2-La partie Back-end est faite sur firebase, pour l'integrer, il vous faut:
- Creer un compte google
- Acceder à la console firebase puis,
- Creer un projet firebase 
- Copier la variable du SDK du projet et coller là au niveau de la partie environnement coté angular
- Renseigner cette variable au niveau du appModule 
- Tester la connexion entre le back-end et le front-end
- Commencer par créer un utilisateur coté front-end et la base de données sera créee automatiquement
- Le fichier json de la base de donnée se trouve dans le meme repertoire de ce fichier.

3-Pour l'envoie d'email, nous avons utiliser sendMail sur un serveur express:
- Entrer dans le dossier emailSender et faire 
- npm init
- npm install 
- npm run dev

--------------------A--lire--aussi----------------------------

SPA (Single Page Application réactive)

Une SPA est une application qui contient une seule page HTML

(index.html) récupérée du serveur.

Préparez l'environnement de développement :

Nous avons installer les outils suivants si vous ne les avez pas déjà sur votre machine :

Coté Front: 

   NODE.JS version 14

NPM est un package manager qui permet l’installation d’énormément d’outils et de libraries dont vous aurez besoin pour tout type de développement.  Pour l’installer, ouvrez une ligne de commande et tapez la commande suivante : 

npm install -g npm@latest
   
 ANGULAR/CLI Angular 11 (Agular JS) :
   
Nous avons installer le CLI d’Angular de manière globale sur la machine avec la commande suivante (avec sudo si besoin) : 

nnpm install -g @angular/cli@11

À partir de là, la commande  ng  est disponible depuis la ligne de commandes depuis n’importe quel dossier de l’ordinateur.     

Pour créer un nouveau projet Angular, naviguez vers le dossier souhaité depuis une ligne de commande et saisissez la commande suivante :

ng new mon-premier-projet

Ensuite, naviguez dans le dossier du projet et lancez le serveur de développement :

cd mon-premier-projet

ng serve --open

Bootstrap : nous avons utilisé la version 3: 

npm install bootstrap@3.3.7 --save
 On va l'intégré au niveau du Typescript
"styles": [
        "../node_modules/bootstrap/dist/css/bootstrap.css",
        "styles.css"
  ],
  La structure globale de l'application est maintenant prête !
  On lence le serveur avec la commande ng serve -open

Pour la partie Backend : Nous avons intégrez Firebase à notre application

D'abord, installez Firebase avec NPM :
npm install firebase --save

Pour cette application, Nous avons créer un nouveau projet sur Firebase.  Une fois l'application créée, la console Firebase vous propose le choix entre différents rubrique 
Choisissez "Ajouter Firebase à votre application Web" et copiez-collez la configuration dans le fichier environnement 
dans le constructeur de votre  app.module.ts  (en important les module de, 'firebase';  et dans imports , mettant à disposition la méthode  initializeApp() ) : 


             
