var phinalphase = phinalphase || {};

phinalphase.createPlayerCop = function (that) {
    var anim = {
        idle: ['idle', 'Idle_', 0, 11, '', 3, 15, 0, 0],
        run: ['run', 'Run_', 0, 13, '', 3, 15, 5, 0],
        jumpStart: ['jumpStart', 'Jump Start_', 0, 19, '', 3, 25, 0, 0],
        jumpAir: ['jumpAir', 'Jump On Air_', 0, 0, '', 3, 15, 0, 0],
        jumpFall: ['jumpFall', 'Jump Fall_', 0, 0, '', 3, 15, 0, 0],
        attack: ['shoot', 'Shoot_', 0, 14, '', 3, 20.2, 0, 0],
        hurt: ['hurt', 'Hurt_', 0, 9, '', 3, 20, 0, 0],
        death: ['death', 'Death_', 0, 14, '', 3, 20, 10, 0],
        flyIdle: ['flyIdle', 'Jetpack Idle_', 0, 11, '', 3, 25, , 0, 0],
        flyForward: ['flyForward', 'Jetpack Fly Forward_', 0, 11, '', 3, 25, 0, 0],
        flyShoot: ['flyShoot', 'Jetpack Fly Shoot_', 0, 11, '', 3, 25, 0, 0],
        flyHurt: ['flyHurt', 'Jetpack Fly Hurt_', 0, 9, '', 3, 25, 0, 0],
        knockback: ['knockback', 'Knockback_', 0, 15, '', 3, 25, 5, 0]
    }

    var skills = [
        {
            type: 'proj',
            enerReq: 5,
            key: 'bullet',
            frame: 'bullet',
            cooldown: 0.75,
            userAnim: anim.attack[0],
            stop: false,
            dmg: 10,
            enemyCollide: function () {

            },
            bullet: {
                number: 30,
                killType: 'KILL_CAMERA_BOUNDS',
                speed: 750,
                scaleX: 0.2,
                scaleY: 0.2,
            },
            offsetX: 10,
            offsetY: -30
        },
        {
            type: 'melee',
            enerReq: 10,
            key: undefined,
            frame: undefined,
            cooldown: 0,
            userAnim: anim.knockback[0],
            stop: false,
            dmg: 5,
            enemyCollide: function () {

            },
            weapon: {
                offsetX: 60,
                offsetY: -30,
                height: 50,
                width: 50
            }
        },
        {
            type: 'special',
            enerReq: 0.5,
            key: undefined,
            frame: undefined,
            cooldown: 0,
            userAnim: anim.flyIdle[0],
            stop: false,
            special: function (that) {
                if (!that.checkEnergy()) {
                    return;
                }
                
                that.user.play(that.userAnim);
                if (that.user.body.velocity.y >= (-Math.abs(that.user.jumpHeight))) {
                    that.user.body.velocity.y -= 23;
                }
                
            }
        }
    ]


    that.playerCop = new phinalphase.Player(that.game, 250, 350, 'playerCop', 'Idle_000', 1000, 0.5, 1, -600, 300, 0.1, 5, anim, skills);
    that.playerCop.noEnergySound = new buzz.sound("/assets/Sound/powerDrain", {
        formats: ["ogg"],
        preload: true,
    });

    that.playerCop.walkingSound = new buzz.sound("/assets/Sound/footstep04", {
        formats: ["ogg"],
        volume: 20,
        preload: true,
    });
    that.playerCop.jetPackSound = new buzz.sound("/assets/Sound/jetpack", {
        formats: ["mp3"],
        volume: 30,
        preload: true,
    });
    that.playerCop.hurtSound = new buzz.sound("/assets/Sound//player/pain", {
        formats: ["wav"],
        volume: 30,
        preload: true,
    });
    that.playerCop.dieSound = new buzz.sound("/assets/Sound//player/die", {
        formats: ["wav"],
        volume: 30,
        preload: true,
    });
    that.playerCop.shootSound = new buzz.sound("/assets/Sound/launches/iceball", {
        formats: ["wav"],
        preload: true,
    });
    that.playerCop.jumpSound = new buzz.sound("/assets/Sound/jump", {
        formats: ["mp3"],
        preload: true,
        volume: 60
    });
    that.playerCop.fallingSound = new buzz.sound("/assets/Sound/falling", {
        formats: ["ogg"],
        preload: true,
        volume: 60
    });
    that.playerCop.shootSound.setSpeed(2.2);





    that.playerCop.playCopSounds = function () {
        if (that.game.input.keyboard.isDown(Phaser.Keyboard.D) && !that.playerCop.isInAir && !that.playerCop.busy) {
            that.playerCop.walkingSound.play();
        } else if (that.game.input.keyboard.isDown(Phaser.Keyboard.A) && !that.playerCop.isInAir && !that.playerCop.busy) {
            that.playerCop.walkingSound.play();
        }
        if (that.game.input.keyboard.isDown(Phaser.Keyboard.W) && that.playerCop.body.blocked.down) {
            that.playerCop.jumpSound.play();
        }
        if (that.playerCop.isInAir && that.playerCop.body.blocked.down) {
            that.playerCop.walkingSound.play();
        }
        if (that.game.input.keyboard.isDown(Phaser.Keyboard.V)) {
            that.playerCop.shootSound.play();
        }
        if (that.playerCop.energy <= 0.2) {
            that.playerCop.noEnergySound.play();
        }
        if (that.game.input.keyboard.isDown(Phaser.Keyboard.G) && that.playerCop.energy > 0.2) {
            that.playerCop.jetPackSound.play();
        }
        if (that.playerCop.isFlinched) {
            that.playerCop.hurtSound.play();
        }
        if (!that.playerCop.alive) {
            that.playerCop.dieSound.play();
        }
        if (that.playerCop.y > 700) {
            that.playerCop.fallingSound.play();
        }
    }



    that.playerCop.checkWorldBounds = true;
    //  that.healthbarShape = null;


}


phinalphase.updatePlayerCop = function (that) {
    that.playerCop.playCopSounds();
    that.playerCop.updateCreature();
    if (that.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        that.playerCop.act('RIGHT');
        that.playerCop.facing = "right";

    } else if (that.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        that.playerCop.act('LEFT');
        that.playerCop.facing = "left";


    } else {
        if (!that.playerCop.isInAir) {
            that.playerCop.act();
        }
    }
    if (that.playerCop.body.velocity.y > 0 && that.playerCop.isInAir) {
        that.playerCop.act('FALL');
    }
    if (that.game.input.keyboard.isDown(Phaser.Keyboard.W) && !that.playerCop.isInAir) {
        that.playerCop.act('UP');

    }
    if (that.game.input.keyboard.isDown(Phaser.Keyboard.V)) {
        that.playerCop.act('SKILL', 0);
    }
    if (that.game.input.keyboard.isDown(Phaser.Keyboard.G)) {
        that.playerCop.act('SKILL', 2);
    }
    if (that.game.input.keyboard.isDown(Phaser.Keyboard.B)) {
        that.playerCop.act('SKILL', 1);
    }
    if (that.game.input.keyboard.isDown(Phaser.Keyboard.G) && that.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        that.playerCop.act('FLYFORWARD');
    }
    if (that.game.input.keyboard.isDown(Phaser.Keyboard.G) && that.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        that.playerCop.scale.setTo(-1, 1);
        that.playerCop.act('FLYFORWARD');
    }
}