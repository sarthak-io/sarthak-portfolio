import Experience from "../Supermain";
import * as THREE from 'three';
import { gsap } from "gsap";
export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene
        this.roomChildren = {};
        this.lerp={
            current:0,
            target:0,
            ease:0.1
        }

        this.setModel();
        this.setAnimation();
        this.onMouseMove();

    }
   setModel(){
    this.actualRoom.children.forEach((child) => {
        child.castShadow= true;
        child.receiveShadow= true;
        console.log(child.name)
        if(child instanceof THREE.Group){
            child.children.forEach((groupchild)=>
            {
                groupchild.castShadow= true;
                groupchild.receiveShadow= true;
            })
        }
     
        if (child.name === "Tv") {
            child.children[1].rotation.x= Math.PI
            child.children[1].material = new THREE.MeshBasicMaterial({
                map: this.resources.items.screen,
            });
        }
        if(child.name ==="Aqua_glass"){
            console.log(child)
            child.children[0].material = new THREE.MeshPhysicalMaterial();
            child.children[0].material.roughness=0;
            child.children[0].material.color.set(0x549dd2);
            child.children[0].material.ior =3
            child.children[0].material.transmission=1;
            child.children[0].material.opacity=1;
        }
        if (child.name === "farm") {
            child.position.x = -0.289521;
            child.position.z = 8.83572;
        }
       
    //    if (
    //             child.name === "mailbox" ||
    //             child.name === "lamp" ||
    //             child.name === "floor1" ||
    //             child.name === "floor2" ||
    //             child.name === "floor3" ||
    //             child.name === "dirt" ||
    //             child.name === "flower1" ||
    //             child.name === "flower2"
    //         ) {
    //             child.scale.set(0, 0, 0);
    //         }
    child.scale.set(0, 0, 0);
   
    if (child.name === "Cube") {
        child.scale.set(1.5, 1.5, 1.5);
        child.position.set(0, -1, 0);
        child.rotation.y = Math.PI / 4;
    }
    this.roomChildren[child.name] = child;

    console.log(this,this.roomChildren.child)
    });
    const width = 0.5;
    const height = 0.5;
    const intensity = 12;
    const rectLight = new THREE.RectAreaLight(
        0xffffff,
        intensity,
        width,
        height
    );
    rectLight.position.set(15.68244, 10, -5);
    rectLight.rotation.x = -Math.PI / 2;
    rectLight.rotation.z = Math.PI / 2;
    this.actualRoom.add(rectLight);

    this.roomChildren["rectLight"] = rectLight;
    this.scene.add(this.actualRoom)
    this.actualRoom.scale.set(0.06,0.06,0.06)
    
   }
   setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
    this.swim = this.mixer.clipAction(this.room.animations[12]);
    this.swim.play();
}
   onMouseMove(){
    window.addEventListener("mousemove",(e)=>{
    this.rotation= ((e.clientX- window.innerWidth/2)*2)/window.innerWidth;
    this.lerp.target=this.rotation*0.1;


    })
   }

    resize() {



    }
    update() {
        this.lerp.current=  gsap.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
          );
          this.actualRoom.rotation.y=this.lerp.current;
        //   this.mixer.update(this.time.delta * 0.0009);
    }
}