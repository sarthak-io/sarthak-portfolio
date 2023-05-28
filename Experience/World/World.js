import Experience from "../Supermain";
import Environment from "./Environment";

import Room from "./Room";
import Floor from "./Floor";
import Controls from "./Controls";
import { EventEmitter } from "events";
export default class World extends EventEmitter{
    constructor() {
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
         this.resources = this.experience.resources;
         this.theme = this.experience.theme;

         this.theme.on("switch", (theme) => {
            this.switchTheme(theme);
        });
         this.resources.on("ready", ()=>{
            this.room = new Room();
            this.environment= new Environment();
            this.controls = new Controls();
            this.floor = new Floor();
            this.emit("worldready");
            
         });
        
         
   

    }

    switchTheme(theme) {
        if (this.environment) {
            this.environment.switchTheme(theme);
        }
    }
    resize() {
       
    

    }
    update() {
        if(this.room){
            this.room.update();
        }
        if(this.controls){
            this.controls.update();
        }
  
    }
}