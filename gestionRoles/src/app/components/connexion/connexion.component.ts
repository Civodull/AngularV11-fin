import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsersService } from 'src/app/services/users.service';
import { UserInterface } from '../create-users/create-users-interface';
import { from } from 'rxjs';
import * as firebase from 'firebase';
import auth from 'firebase/app';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  [x: string]: any;
  @Input() nomUtil: any
  users: any[] = [];
  firestore: any;
  creatUser: FormGroup;
  submitted = false;
  Loading = false;
  id: string | null;
  statut: boolean = false;//utilisateur n'est pas supprimer
  isLoggedIn = false;
  isSignedIn: any;
  titre = 'Ajouter un utilisateur';

  //Definir un tableau pour le role
  public roles: Array<UserInterface> = [{ id: 1, role: "Admin" }, { id: 2, role: "Etudiant" }, { id: 3, role: "Formateur" }, { id: 4, role: "Finance" }];
  public idRole: number = 0;
  constructor(private fb: FormBuilder,
    private _userService: UsersService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    public firebaseService: FirebaseService,
    public firebaseAuth: AngularFireAuth,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore) {

    this.creatUser = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      pseudo: ['', [Validators.required, Validators.minLength(2)]],
      adresse: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      telephone: ['', [Validators.required, Validators.maxLength(15)]],
      role: ['', Validators.required]

      //    role:['', Validators.required]
    });
    //Recuperation de l'utilisateur à modifier
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    //on initialise le composant pour la methode 
    this.editUser();
    // This
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }
  }
  //Fonction aléatoire
  aleatoire(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  //Action pour enregistrer l'edition de l'utilisateur 
  estEditer(id: string) {
  }
  //Methode editer un utilisateur sur firebase a partir de son id
  editUser() {
    this.titre = 'CONNEXION';
    if (this.id !== null) {
      this.Loading = true;
      this._userService.getUserFirebase(this.id).subscribe(data => {
        //console.log(data.payload.data()['nom']);
        this.Loading = false;
        this.creatUser.setValue({
          nom: data.payload.data()['nom'],
          prenom: data.payload.data()['prenom'],
          pseudo: data.payload.data()['pseudo'],
          adresse: data.payload.data()['adresse'],
          email: data.payload.data()['email'],
          telephone: data.payload.data()['telephone'],
          password: data.payload.data()['password'],
          role: data.payload.data()['role']
        })

      })
    }
  }

  //methode sigup 
  async onSignup(email: string, password: string) {
    await this.firebaseService.signIn(email, password)
    if (this.firebaseService.isLoggedIn)
      this.isSignedIn = true;
  }
  //Debut de la base de
  al = false;
  message: string = '';

  async signIn(email: string, password: string) {
    try {
      this._userService.getUser().subscribe(data => {
        this.users = [];
        data.forEach((el: any) => {
          this.users.push({
            id: el.payload.doc.id,
            ...el.payload.doc.data()
          })//,console.log("le role :"+el.payload.doc.role);
        });

        this.users.forEach(donnees => {
          if (email == donnees.email && password == donnees.password) {
            switch (donnees.role) {
              case 'Admin':
                this.router.navigate(['/admin']);
                this.nomUtil = donnees.nom;
                break;
              case 'Etudiant':
                this.router.navigate(['/etudiant']);
                this.nomUtil = donnees.nom;
                break;
              case 'Finance':
                this.router.navigate(['/finance']);
                this.nomUtil = donnees.nom;
                break;
              case 'Formateur':
                this.router.navigate(['/formateur']);
                this.nomUtil = donnees.nom;
                break;
            }
          }
          if (email != donnees.email && password == donnees.password) {
            this.al = true;
            this.message = 'Veuillez renseigner une adresse mail valide'
          } if (email == donnees.email && password != donnees.password) {
            this.al = true;
            this.message = 'Veuillez renseigner un mot de passe correcte!';
          }

        });
      })
    } catch (err) {
      console.log(err);

    }
  }
  //methode d'inscription
  async signUp(email: string, password: string) {
    this
    try {
      await this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    }
    catch (err) {
      console.log(err)
    }
  }
  //Deconnexion eliminer la session de connexion 
  loggout() {
    this.firebaseAuth.signOut()
    localStorage.removeItem('user');
    this.router.navigate(['/connexion']);
  }
  async onSignin(email: string, password: string) {
    await this.firebaseService.signIn(email, password)
    if (this.firebaseService.isLoggedIn)
      this.isSignedIn = true;
    this.router.navigate(['/admin']);
  }
  handleLogout() {
    this.isLoggedIn = false;
  }
  sigGoogle() {
    const googleAuthProvider = new auth.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider);
    this.router.navigate(['/dashbord']);
  }

  signOutGoogle() {
    this.afAuth.signOut();
  }
  //Recupération du mot de passe 
  async motDePasseOublier() {
    var presenceEmail = 0;
    const { value: email } = await Swal.fire({
      title: 'Réinitialisation du mot de passe',
      input: 'email',
      inputLabel: 'Entrez votre adresse mail ci-dessous',
      inputPlaceholder: 'Entrez votre adresse mail ici',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Valider!'
    })
    if (email) {
      Swal.fire(`Confirmez-vous cette adresse mail: ${email} ?`).then((result) => {
        if (result.isConfirmed) {
          var unUser: any = '';
          this._userService.getUser().subscribe(data => {
            this.users = [];
            data.forEach((el: any) => {
              // console.log(el.payload.doc.id);
              // console.log(el.payload.doc.data());
              this.users.push({
                id: el.payload.doc.id,
                ...el.payload.doc.data()
              })
            }); //console.log(this.users);
          });

          //Debut de l'action
          this.users.forEach((donnees) => {
            if (email == donnees.email) {
              presenceEmail = 1
              console.log(this.email)
              //  console.log('Id est:'+donnees.id)
              this.id = donnees.id
              unUser = {
                email: donnees.email,
                password: this.aleatoire(12, 100) + '0-9a-zA-Z' + this.aleatoire(1, 1000),
                dateModification: new Date(),
              }
              this._userService.updateUser(this.id, unUser).then(() => {
                //Debut envoie d'email
                this._userService.registerUser(unUser)
                  .subscribe(
                    (res: any) => {
                      console.log(res)
                      console.log('Connecté');
                    },
                    (err: any) => console.log(err)
                  )
                //Fin
                this.toastr.success('Un message vous a été envoyé', 'Vérifiez votre boite mail!', {
                  positionClass: 'toast-top-right',
                });
              });
            } 
          });
        }
        alert('Adresse email incorrecte vérifiez que vous avez entrez une adresse valide');
        this.router.navigate(['/connexion']);
      })
    }
  }
  //Fin recupération 

}


