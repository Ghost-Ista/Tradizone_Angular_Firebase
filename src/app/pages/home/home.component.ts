import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategoriaI } from 'src/app/model/categoria_i';
import { PlatoI } from 'src/app/model/plato_i';
import { RestauranteService } from 'src/app/service/restaurante.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categorias : Array<CategoriaI>; 
  public comidas= [];
  public restaurantes = [];
  public recetas = [];

  restaurante: any;
  nombre_restaurante: string;

  filterPost = '';

  constructor(private fbstore: AngularFirestore, private restauranteService: RestauranteService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getFoods();
  }

  async getFoods(){

    try {
      await this.fbstore.collection("food").snapshotChanges().subscribe(data=>{
        this.comidas = data.map(
          result => {
            return{
            
            food_id : result.payload.doc.id,
            food_category : result.payload.doc.data()["food_category"],
            food_cost : result.payload.doc.data()["food_cost"],
            food_description : result.payload.doc.data()["food_description"],
            food_image : result.payload.doc.data()["food_image"],
            food_name : result.payload.doc.data()["food_name"],
            food_state: result.payload.doc.data()["food_state"],
            food_restaurant : result.payload.doc.data()["food_restaurant"]
            }
            
          }
        );
      });  
    } catch (error) {
      console.log(error)
    }
    
  }


  getRestaurantes(){
    try {
      this.fbstore.collection("restaurants").snapshotChanges().subscribe(data =>{
        this.restaurantes = data.map(
          result => {
            return{
              restaurant_id : result.payload.doc.id,
              restaurant_description: result.payload.doc.data()["restaurant_description"],
              restaurant_image: result.payload.doc.data()["restaurant_image"],
              restaurant_location: result.payload.doc.data()["restaurant_location"],
              restaurant_name: result.payload.doc.data()["restaurant_name"],
              restaurant_phone: result.payload.doc.data()["restaurant_phone"],
              restaurant_zone: result.payload.doc.data()["restaurant_zone"],
              user_id: result.payload.doc.data()["user_id"]          
            }
          }
        );
      });
    } catch (error) {
      console.log(error)
    }
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


  seleccionOpcion(tipo: string){
    this.filterPost = tipo;
    
    if(this.filterPost == "Restaurantes"){
      this.getRestaurantes();
      this.recetas = [];
    }else if(this.filterPost == "Recetas"){
      this.llenarRecetas();
      this.restaurantes = [];
    }else{
      this.recetas = [];
      this.restaurantes = [];
    }

  }


  llenarRecetas(){
    this.recetas = [
      {
        "receta_titulo": "Tamal Cuencano",
        "receta_ingredientes":"1 libra de ma??z seco marca Ak??"+
                              "2 cucharadas de mantequilla"+
                              "1 cebolla paite??a cortada en cuatro pedazos"+
                              "3 cebollas blancas picadas finamente"+
                              "1 cucharadita de achiote"+
                              "1 cubito de concentrado de caldo de pollo"+
                              "?? libra de carne de chancho"+
                              "?? taza de pasas"+
                              "?? taza de arvejas cocinadas"+
                              "2 huevos duros"+
                              "1 pizca de az??car"+
                              "1 paquete de hojas de achira para envolver"+
                              "Sal, pimienta y ajo al gusto",
        "receta_preparacion":"Remoja el ma??z en agua fr??a durante dos d??as, cambiando el agua diariamente. Una vez remojado, escurre y muele el ma??z fino."+
                            "Aparte, en una olla con agua, cocina la carne de cerdo con cebolla paite??a, ajo, sal, pimienta y cubo de concentrado de pollo, hasta que la carne est?? suave y se pueda desmechar."+
                            "Cierne el caldo sobrante, a??ade el ma??z molido a la olla y cocina a fuego lento, revolviendo constantemente hasta que el ma??z est?? listo. A??ade la pizca de az??car para quitar el amargor del ma??z. Retira del fuego y deja enfriar."+
                            "Para preparar el condumio, sofr??e la mantequilla y achiote. Una vez caliente, a??ade la cebolla blanca y cocina por un minuto. Agrega la carne de cerdo mechada, arvejas y pasas. Sazona con sal y pimienta."+
                            "Lava y seca las hojas de achira. Una vez secas, arma los tamales, colocando un cuchar??n de masa de ma??z y encima la carne de cerdo y una o dos rodajas de huevo duro. Cierra el tamal y coc??nalo en una olla tamalera por 20 minutos, aproximadamente.",
        "receta_url_imagen":"https://i0.wp.com/akiestamosparati.aki.com.ec/wp-content/uploads/2020/10/tamal.jpg?resize=1024%2C649&amp;ssl=1",
        "receta_autor":"Angel Lucero",
        "receta_fecha":"2021-04-20 10:32"
      },
      {
        "receta_titulo": "Sancocho Cuencano",
        "receta_ingredientes":"3 cucharaditas de ajo picado listo en aceite de girasol Nutrialimentos"+
                              "2 libras de carne de cerdo cortada en trozos peque??os"+
                              "1 cebolla paite??a en mitades"+
                              "2 cebollas blancas en mitades"+
                              "1 ?? tazas de agua"+
                              "1 taza de zumo de naranja"+
                              "1 cucharada de sal"+
                              "?? cucharadita de comino"+
                              "Pimienta al gusto"+
                              "Para acompa??ar"+
                              "Llapingachos"+
                              "Mote cocinado"+
                              "Ma??z tostado"+
                              "Encurtido de tomate, cebolla y culantro",
        "receta_preparacion":"En una olla a fuego bajo cocina la carne con cebolla paite??a, cebollas blancas, ajo picado listo en aceite de girasol Nutrialimentos, agua, zumo de naranja, sal, comino y pimienta, hasta que se haya secado todo el l??quido y la carne est?? suave. En una bandeja disp??n la carne, llapingachos, mote, ma??z tostado y encurtido. Sirve. ",
        "receta_url_imagen":"https://i0.wp.com/akiestamosparati.aki.com.ec/wp-content/uploads/2020/10/sancocho-cuencano.jpg?resize=1024%2C546&amp;ssl=1",
        "receta_autor":"Chirss Eduu",
        "receta_fecha":"2021-04-25 14:31"
      },
      {
        "receta_titulo": "Mote pillo con carne asada",
        "receta_ingredientes":"2 tazas de mote cocinado"+
                              "?? taza de leche"+
                              "?? taza de queso fresco picado"+
                              "3 ramas de cebolla blanca picada"+
                              "2 huevos"+
                              "2 cucharadas de aceite con achiote"+
                              "1 aguacate maduro"+
                              "Sal, pimienta y culantro picado al gusto"+
                              "Para la carne"+
                              "1 cucharadita de comino marca Ak??"+
                              "4 filetes de carne de cerdo"+
                              "2 cucharadas de aceite de achiote"+
                              "3 dientes de ajo picados"+
                              "Sal y pimienta al gusto",
        "receta_preparacion":"Para preparar el mote pillo, en una sart??n, a fuego medio, vierte el aceite con achiote y cuando est?? caliente, agrega la cebolla blanca picada y sofr??e por dos minutos. A??ade el mote cocinado y mezcla bien."+
        "Aparte, en un taz??n, bate la leche con los huevos y agrega al mote. Mezcla constantemente hasta que se seque. Agrega el queso picado y finalmente, el culantro."+
        "Para preparar la carne, ali??a los filetes con todos los ingredientes y deja reposar por 20 minutos. Asa los filetes a la parrilla o en una sart??n. Sirve con el mote pillo y aguacate.",
        "receta_url_imagen":"https://i2.wp.com/akiestamosparati.aki.com.ec/wp-content/uploads/2020/10/mote-pillo.jpg?resize=1024%2C649&amp;ssl=1",
        "receta_autor":"Chriss Eddu",
        "receta_fecha":"2021-04-27 10:26"
      }
    ]; 
  }

}
