import {player} from "./index.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

export class Sprite {
    constructor({
        position,
        imageSrc,
        frameRate = 1,
        frameBuffer = 2,
        animations,
        loop = true,
        autoplay = true,
    }) {
        this.position = position;
        this.image = new Image();
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / this.frameRate;
            this.height = this.image.height;
        };

        this.image.src = imageSrc;
        this.loaded = false;
        this.frameRate = frameRate;
        this.currentFrames = 0;
        this.elapsedFrames = 0;
        this.frameBuffer = frameBuffer;
        this.animations = animations;
        this.loop = loop;
        this.autoplay = autoplay;
        if (this.animations) {
            for (let key in this.animations) {
                const image = new Image();
                image.src = this.animations[key].imageSrc;
                this.animations[key].image = image;
            }
        }
    }

    play() {
        this.autoplay = true;
    }

    draw() {
        if (!this.loaded) return;

        const cropbox = {
            position: {
                x: this.width * this.currentFrames,
                y: 0,
            },
            width: this.width,
            height: this.height,
        };
        c.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        );
        this.updateFrames();
    }

    updateFrames() {
        if (!this.autoplay) return;

        this.elapsedFrames++;

        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrames < this.frameRate - 1) {
                this.currentFrames++;
            } else if (this.loop) {
                this.currentFrames = 0;
            } else {
                this.currentFrames = this.frameRate - 1;
            }
        }            

        if (this.currentAnimation?.onCompelete) {
            if (
                this.currentFrames === this.frameRate - 1 &&
                !this.currentAnimation.isActive
            ) {
                this.currentAnimation.onCompelete();
                this.currentAnimation.isActive = true;
            }
        }
    }
}
