import Experience from "./Supermain";
import * as THREE from 'three';
import{ OrbitControls} from "three/examples/jsm/controls/OrbitControls"
export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
   
        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
       
    }
    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35, this.sizes.aspect, 0.1, 1000
        );
        this.scene.add(this.perspectiveCamera)
        this.perspectiveCamera.position.x = 72;
        this.perspectiveCamera.position.y = 12;
        this.perspectiveCamera.position.z = 17;
    }
    createOrthographicCamera() {
        
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustum) / 2,
            (this.sizes.aspect * this.sizes.frustum) / 2,
            this.sizes.frustum / 2,
            -this.sizes.frustum / 2,
            -50, 50


        );
        this.orthographicCamera.position.y = 5.7;
        this.orthographicCamera.position.z = 10;
        this.orthographicCamera.rotation.x = -Math.PI / 6;
        this.scene.add(this.orthographicCamera);


    }
    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
        this.controls.enableDamping= true;
        this.controls.enableZoom= true;
    } 
    
    resize() {
        // updates cameras
    //             this.helper = new THREE.CameraHelper(this.orthographicCamera)
    //     this.scene.add(this.orthographicCamera)
    //     this.scene.add(this.helper)

    //    const size =20;
    //    const division=20;
    //    const gridHelper= new THREE.GridHelper(size,division)
    //    this.scene.add(gridHelper)
    //    const axesHelper = new THREE.AxesHelper(5);
    //    this.scene.add(axesHelper)
    
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();
         console.log(this.perspectiveCamera.position)

        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frusatum) / 2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustum) / 2;
        this.orthographicCamera.top = this.sizes.frustum / 2;
        this.orthographicCamera.bottom = -this.sizes.frustum / 2;
        this.orthographicCamera.updateProjectionMatrix()
        console.log(this.orthographicCamera.position)
    }
    update() {
    this.controls.update();
    // this.helper.matrixWorldNeedsUpdate= true;
    // this.helper.update();
    // this.helper.position.copy(this.orthographicCamera.position)
    // this.helper.rotation.copy(this.orthographicCamera.rotation)
    
    }
}