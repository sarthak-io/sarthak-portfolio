import { EventEmitter } from "events";
import Experience from "./Supermain.js";
import {gsap as GSAP} from "gsap";


import convert from "./Utils/Convert.js";
export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets() {
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".intro-main-title"));
        convert(document.querySelector(".intro-main-description"));
        convert(document.querySelector(".intro-second-subheading"));
        convert(document.querySelector(".second-sub"));

        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        
    }

    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
            this.timeline.to(".loader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document
                        .querySelector(".loader")
                        .classList.add("hidden");
                },
            });
            if (this.device === "desktop") {
                this.timeline
                    .to(this.roomChildren.Cube.scale, {
                        x: 1.4,
                        y: 1.4,
                        z: 1.4,
                        ease: "back.out(2.5)",
                        duration: 0.7,
                    })
                    .to(this.room.position, {
                        x: -1,
                        ease: "power1.out",
                        duration: 0.7,
                    });
            } else {
                this.timeline
                    .to(this.roomChildren.Cube.scale, {
                        x: 1.4,
                        y: 1.4,
                        z: 1.4,
                        ease: "back.out(2.5)",
                        duration: 0.7,
                    })
                    .to(this.room.position, {
                        z: -1,
                        ease: "power1.out",
                        duration: 0.7,
                    });
            }
            this.timeline
                .to(".intro-text .animatedis", {
                    yPercent: 0,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                })
                .to(
                    ".down-btn",
                    {
                        opacity: 1,
                    },
                    "same"
                )
                .to(
                    ".day-night",
                    {
                        opacity: 1,
                        onComplete: resolve,
                    },
                    "same"
                );
        });
    }

    secondIntro() {
        return new Promise((resolve) => {
            this.secondTimeline = new GSAP.timeline();

            this.secondTimeline
                .to(
                    ".intro-text .animatedis",
                    {
                        yPercent: 100,
                        stagger: 0.05,
                        ease: "back.in(1.7)",
                    },
                    "fadeout"
                )
                .to(
                    ".down-btn",
                    {
                        opacity: 0,
                    },
                    "fadeout"
                )
                .to(
                    this.room.position,
                    {
                        x: 0,
                        y: 0,
                        z: 0,
                        ease: "power1.out",
                    },
                    "same"
                )
                .to(
                    this.roomChildren.Cube.rotation,
                    {
                        y: 2 * Math.PI + Math.PI / 4,
                    },
                    "same"
                )
                .to(
                    this.roomChildren.Cube.scale,
                    {
                        x: 10,
                        y: 10,
                        z: 10,
                    },
                    "same"
                )
                if(this.device==="desktop"){
                    this.secondTimeline.to(
                    this.camera.orthographicCamera.position,
                    {
                        y: 6.7,
                      
                    },
                    "same"
                )}
                else{
                    this.secondTimeline.to(
                        this.camera.orthographicCamera.position,
                        {
                            y: 6.7,
                           
                        },
                        "same")

                }
                this.secondTimeline.to(
                    this.roomChildren.Cube.position,
                    {
                        x: 0.638711,
                        y: 8.5618,
                        z: 1.3243,
                    },
                    "same"
                )
                .set(this.roomChildren.body.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                })
                .to(
                    this.roomChildren.Cube.scale,
                    {
                        x: 0,
                        y: 0,
                        z: 0,
                        duration: 1,
                    },
                    "introtext"
                )
                .to(
                    ".intro-main-title .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".intro-main-description .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".first-sub .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".second-sub .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    this.roomChildren.Aqua_glass.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.5"
                )
                .to(
                    this.roomChildren.watch.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.4"
                )
                .to(
                    this.roomChildren.shells.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.3"
                )
                .to(
                    this.roomChildren.floor.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.2"
                )
                .to(
                    this.roomChildren.desk.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.1"
                )
                .to(
                    this.roomChildren.upper.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.1"
                )
                .to(this.roomChildren.Tv.scale, {
                    x: 0.145823,
                    y: 1.82305,
                    z: 2.99216,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                })
                .set(this.roomChildren.farm.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                })
                .to(
                    this.roomChildren.chair.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    "chair"
                )
                .to(
                    this.roomChildren.Fish.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    "chair"
                )
                .to(
                    this.roomChildren.chair.rotation,
                    {
                        y: 4 * Math.PI + Math.PI / 4,
                        ease: "power2.out",
                        duration: 1,
                    },
                    "chair"
                )
                .to(".down-btn", {
                    opacity: 1,
                    onComplete: resolve,
                });
        });
    }

    onScroll(e) {
        if (e.deltaY > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initalY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initalY - currentY;
        if (difference > 0) {
            console.log("swipped up");
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.intialY = null;
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro() {
        this.scaleFlag = true;
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }
    async playSecondIntro() {
        this.moveFlag = false;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols");
    }

    move() {
        if (this.device === "desktop") {
            this.room.position.set(-1, 0, 0);
        } else {
            this.room.position.set(0, 0, -1);
        }
    }

    scale() {
        this.roomChildren.rectLight.width = 0;
        this.roomChildren.rectLight.height = 0;

        if (this.device === "desktop") {
            this.room.scale.set(0.06, 0.06, 0.06);
        } else {
            this.room.scale.set(0.04, 0.04, 0.04);
        }
    }

    update() {
        if (this.moveFlag) {
            this.move();
        }

        if (this.scaleFlag) {
            this.scale();
        }
    }
}