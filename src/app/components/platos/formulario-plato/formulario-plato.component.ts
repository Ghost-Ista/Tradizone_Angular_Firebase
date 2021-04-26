import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CategoriaI } from 'src/app/model/categoria_i';
import { RestauranteI } from 'src/app/model/restaurante_i';
import { AuthService } from 'src/app/service/auth.service';
import { ComidaService } from 'src/app/service/comida.service';

@Component({
  selector: 'app-formulario-plato',
  templateUrl: './formulario-plato.component.html',
  styleUrls: ['./formulario-plato.component.scss']
})
export class FormularioPlatoComponent implements OnInit {

  categorias: Array<CategoriaI>;
  restaurantes = [];

  private comida: any = {};

  private imagen : File = null;
  private imagenPath: string;

  constructor(private fbstore: AngularFirestore, private comidaService: ComidaService, private storage: AngularFireStorage, 
              private authService: AuthService, private router: Router) { }

  platoRegistroForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    costo: new FormControl('', Validators.required),
    restaurante: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.getCategories();
    this.getRestaurantes();
  }

  onChange(e){
    this.imagen = e.target.files[0];
  }

  registrarPlato(){
    const {nombre, categoria, descripcion, costo, restaurante} = this.platoRegistroForm.value;
    if(this.imagen != null && this.platoRegistroForm.valid){
      const usuarioLoguedo = this.authService.getUsuarioLogeado();
      usuarioLoguedo.then(
        data=> {
          this.comida['food_name'] = nombre;
          this.comida['food_category'] = categoria;
          this.comida['food_description'] = descripcion;
          this.comida['food_cost'] = costo;
          this.comida['food_restaurant'] = restaurante;
          this.crearPlato(this.comida, this.imagen)
        },
        err => alert('¡A ocurrido un problema al obtener el usuario autenticado!')
      );
    }else alert('¡Debe llenar todos los campos!');
  }

  private crearPlato(comida: any, imagen: File){
    this.imagenPath = `imagenes_comida/${imagen.name}`;
    const fileRef = this.storage.ref(this.imagenPath);
    const task = this.storage.upload(this.imagenPath, imagen);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(urlImagen => {
        comida['food_image'] = urlImagen;
        this.comidaService.crearComida(comida);
        alert("¡Comida registrado correctamente!")
        this.router.navigate(['/home']);
      }, 
      err => alert("ocurrio un error al intentar obtener la url de la imagen!"))
    })).subscribe();
  }

  getCategories() {
    this.fbstore.collection("categories").snapshotChanges().subscribe(
      data => {
        this.categorias = data.map(
          result => {
            let categoria = new CategoriaI;
            categoria.category_id = result.payload.doc.id;
            categoria.category_name = result.payload.doc.data()["category_name"];
            categoria.category_image = result.payload.doc.data()["category_image"]

            return categoria; 
          }
        );
        
      }
    );
  }

  async getRestaurantes(){
    
    try{
      await this.fbstore.collection("restaurants").snapshotChanges().subscribe(data=>{
        this.restaurantes = data.map(
          result=>{
            return{
            uid : result.payload.doc.id,
            restaurant_name : result.payload.doc.data()["restaurant_name"]/*,
            restaurant_description : result.payload.doc.data()["restaurant_description"],
            restaurant_image : result.payload.doc.data()["restaurant_image"],
            restaurant_location : result.payload.doc.data()["restaurant_location"],
            restaurant_phone : result.payload.doc.data()["restaurant_phone"],
            restaurant_zone : result.payload.doc.data()["restaurant_zone"]*/
          }
          }
        );
      });
    }catch(error){
      console.log(error)
    }
  }
}