import Experience from "../Supermain";
import * as THREE from 'three';
import { gsap as GSAP} from "gsap";
export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.obj = {
            colorObj: { r: 0, g: 0, b: 0 },
            intensity: 3,
        };
     
        

        this.setSunlight();
        
        
    }
   setSunlight(){
   this.sunLight = new THREE.DirectionalLight("#ffffff",3);
   this.sunLight.castShadow= true;
   this.sunLight.shadow.camera.far=10;
   this.sunLight.shadow.mapSize.set(2048,2048);
   this.sunLight.shadow.normalBias=0.05;
   
   this.sunLight.position.set(-.5,3,1);
   this.scene.add(this.sunLight)
  
   this.ambientLight = new THREE.AmbientLight("#ffffff",1.5)
   this.scene.add(this.ambientLight)
     

   }
   
   switchTheme(theme) {

    if (theme === "dark") {
        GSAP.to(this.sunLight.color, {
            r: 0.17254901960784313,
            g: 0.23137254901960785,
            b: 0.6862745098039216,
        });
        GSAP.to(this.ambientLight.color, {
            r: 0.17254901960784313,
            g: 0.23137254901960785,
            b: 0.6862745098039216,
        });
        GSAP.to(this.sunLight, {
            intensity: 0.78,
        });
        GSAP.to(this.ambientLight, {
            intensity: 0.78,
        });
    } else {
        GSAP.to(this.sunLight.color, {
            r: 255 / 255,
            g: 255 / 255,
            b: 255 / 255,
        });
        GSAP.to(this.ambientLight.color, {
            r: 255 / 255,
            g: 255 / 255,
            b: 255 / 255,
        });
        GSAP.to(this.sunLight, {
            intensity: 3,
        });
        GSAP.to(this.ambientLight, {
            intensity: 1.5,
        });
    }
}
    resize() {

  

    }
    update() {

    }
}