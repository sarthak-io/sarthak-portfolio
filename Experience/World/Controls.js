import Experience from "../Supermain";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Floor from "./Floor";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;
    this.floor = new Floor();
    this.room.children.forEach((child) => {
      if (child.type === "RectAreaLight") {
        this.rectLight = child;
      }
    });
    this.circleFirst = this.floor.circleFirst;
    this.circleSecond = this.floor.circleSecond;
    this.circleThird = this.floor.circleThird;
    gsap.registerPlugin(ScrollTrigger);
   

    this.setScrollTrigger();
    
  }
  // setupASScroll() {
  //   // https://github.com/ashthornton/asscroll
  //   const asscroll = new ASScroll({
      
  //     disableRaf: true,
  //   });

  //   gsap.ticker.add(asscroll.update);

  //   ScrollTrigger.defaults({
  //     scroller: asscroll.containerElement,
  //   });

  //   ScrollTrigger.scrollerProxy(asscroll.containerElement, {
  //     scrollTop(value) {
  //       if (arguments.length) {
  //         asscroll.currentPos = value;
  //         return;
  //       }
  //       return asscroll.currentPos;
  //     },
  //     getBoundingClientRect() {
  //       return {
  //         top: 0,
  //         left: 0,
  //         width: window.innerWidth,
  //         height: window.innerHeight,
  //       };
  //     },
  //     fixedMarkers: true,
  //   });

  //   asscroll.on("update", ScrollTrigger.update);
  //   ScrollTrigger.addEventListener("refresh", asscroll.resize);

  //   requestAnimationFrame(() => {
  //     asscroll.enable({
  //       newScrollElements: document.querySelectorAll(
  //         ".gsap-marker-start, .gsap-marker-end, [asscroll]"
  //       ),
  //     });
  //   });
  //   return asscroll;
  // }

  // setSmoothScroll() {
  //   this.asscroll = this.setupASScroll();
  // }

  setScrollTrigger() {
    // create
    let mm = gsap.matchMedia();

    // add a media query. When it matches, the associated function will run
    mm.add("(min-width: 969px)", () => {
      // Fisrt section
      this.FirstMoveTimline = new gsap.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      });

      this.FirstMoveTimline.to(this.room.position, {
        x: () => {
          return this.sizes.width * 0.0014
        }

      })

      this.secondMoveTimline = new gsap.timeline({
        scrollTrigger: {
          trigger: ".second-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      });

      this.secondMoveTimline.to(this.room.position, {
        x: () => {
          return .6
        },
        z: () => {
          return this.sizes.height * 0.0032
        }

      }, "same")
      this.secondMoveTimline.to(this.room.scale, {
        x: 0.3,
        y: 0.3,
        z: 0.3,

      }, "same")
        .to(
          this.rectLight,
          {
            width: 0.5 * 3,
            height: 0.7 * 3,
          },
          "same"
        );
      this.thirdMoveTimeline = new gsap.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(this.camera.orthographicCamera.position, {
        y: 1.2,
        x: -4.7,
      }, "same")
        .to(this.room.scale, {
          x: 0.25,
          y: 0.25,
          z: 0.25,

        }, "same")

    }),
      mm.add("(max-width: 969px)", () => {

        // Resets
        this.room.scale.set(0.04, 0.04, 0.04);
        this.room.position.set(0, 0, 0);
        this.rectLight.width = 0.3;
        this.rectLight.height = 0.4;


        // First section -----------------------------------------
        this.firstMoveTimeline = new gsap.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            // invalidateOnRefresh: true,
          },
        }).to(this.room.scale, {
          x: 0.06,
          y: 0.06,
          z: 0.06,
        });

        // Second section -----------------------------------------
        this.secondMoveTimeline = new gsap.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.scale,
            {
              x: 0.2,
              y: 0.2,
              z: 0.2,
            },
            "same"
          )
          .to(
            this.rectLight,
            {
              width: 0.3 * 3.4,
              height: 0.4 * 3.4,
            },
            "same"
          )

          .to(
            this.room.position,
            {
              x: 2,

            },
            "same"
          );

        // Third section -----------------------------------------
        this.thirdMoveTimeline = new gsap.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).to(
          this.room.scale,
          {
            x: 0.18,
            y: 0.18,
            z: 0.18,
          },
          "same"
        )

          .to(this.room.position, {
            z: -6.5,
          }, "same")

      })

    mm.add("all", () => {
      this.sections = document.querySelectorAll(".section");
      this.sections.forEach((section) => {
        this.progressWrapper =
          section.querySelector(".progress");
        this.progressBar = section.querySelector(".progress-bar");

        if (section.classList.contains("right")) {
          gsap.to(section, {
            borderTopLeftRadius: 10,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: 0.6,
            },
          });
          gsap.to(section, {
            borderBottomLeftRadius: 700,
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        } else {
          gsap.to(section, {
            borderTopRightRadius: 10,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: 0.6,
            },
          });
          gsap.to(section, {
            borderBottomRightRadius: 700,
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }
        gsap.from(this.progressBar, {
          scaleY: 0,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
            pin: this.progressWrapper,
            pinSpacing: false,
          },
        });
      });
      this.firstCircle = new gsap.timeline({
        scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
        },
    }).to(this.circleFirst.scale, {
        x: 3,
        y: 3,
        z: 3,
    });

    // Second section -----------------------------------------
    this.secondCircle = new gsap.timeline({
        scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
        },
    })
        .to(
            this.circleSecond.scale,
            {
                x: 3,
                y: 3,
                z: 3,
            },
            "same"
        )
        .to(
            this.room.position,
            {
                y: 0.7,
            },
            "same"
        );

    // Third section -----------------------------------------
    this.thirdCircle = new gsap.timeline({
        scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
        },
    }).to(this.circleThird.scale, {
        x: 3,
        y: 3,
        z: 3,
    });
      // Mini Platform Animations
      this.secondPartTimeline = new gsap.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "center center",
        },
      });

      this.room.children.forEach((child) => {
        if (child.name === "farm") {
          this.first = gsap.to(child.position, {
            x: -10.2465,
            z: 20,
            duration: 0.3,
          });
        }
        if (child.name === "mailbox") {
          this.second = gsap.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
          });
        }
        if (child.name === "lamp") {
          this.third = gsap.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }
        if (child.name === "floor1") {
          this.fourth = gsap.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }
        if (child.name === "floor2") {
          this.fifth = gsap.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
          });
        }
        if (child.name === "floor3") {
          this.sixth = gsap.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }
        if (child.name === "dirt") {
          this.seventh = gsap.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }
        if (child.name === "flower1") {
          this.eighth = gsap.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }
        if (child.name === "flower2") {
          this.ninth = gsap.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }
      });
      this.secondPartTimeline.add(this.first);
      this.secondPartTimeline.add(this.second);
      this.secondPartTimeline.add(this.third);
      this.secondPartTimeline.add(this.fourth, "-=0.2");
      this.secondPartTimeline.add(this.fifth, "-=0.2");
      this.secondPartTimeline.add(this.sixth, "-=0.2");
      this.secondPartTimeline.add(this.seventh, "-=0.2");
      this.secondPartTimeline.add(this.eighth);
      this.secondPartTimeline.add(this.ninth, "-=0.1");

    })


  }

  resize() {
    // Handle resize logic
  }

  update() {
    // Update logic
  }
}
