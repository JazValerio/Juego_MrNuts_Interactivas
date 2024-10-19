export class Player {

    constructor(scene,joystick) {
        this.Scene = scene;
        this.joystick = joystick;
    }

    playerJump = -560;


    create() {
        this.player = this.Scene.physics.add.sprite(100, 400, 'MrNuts');
        this.player.setOrigin(0, 0);
        this.player.setScale(0.7);
        this.player.setData('velx', 240);
        this.player.setData('veljump', 640);
        this.player.setAngle(0);
        this.player.setBounce(0.2);
        this.player.setSize(50, 50);
        this.player.setOffset(35, 109);
        /*
        this.Scene.cameras.main.startFollow(this.player);
        this.Scene.cameras.main.setZoom(1.5);  
        this.Scene.cameras.main.setBounds(0, 0, this.Scene.game.config.width * this.Scene.cameras.main.zoom, this.Scene.game.config.height * this.Scene.cameras.main.zoom);
        
        */

        //this.player.setCollideWorldBounds(true);

        this.Scene.anims.create({
            key: 'right',
            frames: this.Scene.anims.generateFrameNumbers('MrNuts', { start: 0, end: 49 }),
            frameRate: 50,
            //yoyo: true,
            repeat: -1
        });
       
        this.Scene.anims.create({
            key: 'turn',
            frames: this.Scene.anims.generateFrameNumbers('MrNuts-idle', { start: 0, end: 49 }),
            frameRate: 20,
            repeat: -1
        });

        this.Scene.anims.create({
            key: 'interact',
            frames: this.Scene.anims.generateFrameNumbers('MrNuts-interact', { start: 0, end: 68 }),
            frameRate: 40,
            repeat: 1
        });

        this.controles = this.Scene.input.keyboard.createCursorKeys();
        this.joystickCursosrs=this.joystick.createCursorKeys();

        this.isTouching = false;
        this.Scene.input.on('pointerdown', (pointer) => {//esto es para que se detecte cuando se toca pantalla (celular)
            this.isTouching = true;
            this.handleTouch(pointer);

        });

        this.Scene.input.on('pointerup', () => {//esto es para que se detecte cuando no se toca pantalla (celular)
            this.isTouching = false;
            this.player.setVelocityX(0);
            this.player.anims.play('turn', true);

        })

        //this.cameras.main.setBounds(0, 0, 1200, 700);
        //this.cameras.main.startFollow(this.player, true, 0.5, 0.5);

    }



    update() {
        this.onGround = this.player.body.onFloor();

        if (this.controles.right.isDown || this.joystickCursosrs.right.isDown) {
            this.player.setVelocityX(this.player.getData('velx'));
            this.player.anims.play('right', true);
            this.player.flipX = false;
        } else if (this.controles.left.isDown || this.joystickCursosrs.left.isDown) {
            this.player.setVelocityX(-this.player.getData('velx'));
            this.player.anims.play('right', true);
            this.player.flipX = true;
        } else if (!this.controles.up.isDown) {
            this.player.setVelocityX(0);
            this.player.anims.play('turn', true);
        }

        if ((this.controles.up.isDown || this.controles.space.isDown || this.joystickCursosrs.up.isDown) && this.onGround) {
            this.player.body.setVelocityY(this.playerJump);
        }
        /*
        else if (this.Scene.input.pointer1.isDown) {
            this.handleTouch(this.Scene.input.pointer1);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn', true);
        }
       */

        this.outOfWorld();

    }

    handleTouch(pointer) {
        // Si cuando toca está a la derecha del juagador
        if (pointer.x > this.player.x) {
            this.player.setVelocityX(this.player.getData('velx'));
            this.player.anims.play('right', true);
        }
        // Si cuando toca está a la izquierda del juagador
        else if (pointer.x < this.player.x) {
            this.player.setVelocityX(-this.player.getData('velx'));
            this.player.anims.play('right', true);
        }
    }

    outOfWorld() {
        const worldBounds = this.Scene.physics.world.bounds;

        // Verificar si el jugador sale de los límites del mundo
        if (this.player.x < worldBounds.x ||
            this.player.x > worldBounds.width ||
            this.player.y < worldBounds.y ||
            this.player.y > worldBounds.height) {

            // Reiniciar la escena si el jugador sale del mundo
            //this.Scene.scene.restart();
            this.Scene.cameras.main.fade(1000);
            this.Scene.cameras.main.on('camerafadeoutcomplete', function (camera, effect) {
                //restart game 
                this.Scene.scene.restart();
            }, this)
        }

    }

    playerSlowDown() {
        let velx = this.player.getData('velx');
        velx -= 100;
        this.player.setData('velx', velx);
    }

    playerSpeedBoost() {
        let velx = this.player.getData('velx');
        
        if (velx > 240) {
            velx += 50;
        }else{
            velx += 150; 
        }
        
        this.player.setData('velx', velx);

        //chatgpt: a partir de este metodo (metodo pegado) dayudame a controlar que despues de 10 segundos regrese la velocidad a la original.
        // Después de 10 segundos (10000 milisegundos), regresar la velocidad a la original
        this.Scene.time.delayedCall(10000, () => {
            this.player.setData('velx', 240);
        });
    }

    get() {
        return this.player;
    }

}

