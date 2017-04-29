var phinalphase = phinalphase || {};

var animNinja = {
    idle: ['idle', 'Idle_', 0, 11, '', 3, 15, 0, 0],
    run: ['run', 'Run_', 0, 12, '', 3, 15, 0, 0],
    jumpStart: ['jumpStart', 'Jump Start_', 0, 11, '', 3, 15, 0, 0],
    jumpAir: ['jumpAir', 'Jump On Air_', 0, 0, '', 3, 15, 0, 0],
    jumpFall: ['jumpFall', 'Jump Fall_', 0, 0, '', 3, 15, 0, 0],
    attack: ['attack1', 'Attack_', 0, 13, '', 3, 20, -11, 0],
    hurt: ['hurt', 'Hurt_', 0, 11, '', 3, 20, 0, 0],
    death: ['death', 'Death_', 0, 19, '', 3, 20, -10, 0],
    block: ['block', 'Block Parry_', 0, 19, '', 3, 20, 0, 0]
};

var skillsNinja = [
    {
        type: 'aurabuff',
        enerReq: 30,
        key: 'popAura',
        frame: 'pop_explosion0001',
        cooldown: 20,
        userAnim: animNinja.block[0],
        stop: true,
        duration: 10,
        anim: ['pop', 'pop_explosion', 1, 18, '', 4, 15],
        effects: 'that.speed += 100',
        afterEffects: 'that.speed -= 100'
    },
    // {
    //     type: 'auradmg',
    //     enerReq: 10,
    //     key: 'popAura',
    //     frame: 'pop_explosion0001',
    //     duration: 10,
    //     cooldown: 15,
    //     anim: ['pop', 'pop_explosion', 1, 18, '', 4, 15],
    //     dmg: 10,
    //     enemyCollide: function (enemy) {

    //     },
    //     userAnim: animNinja.block[0],
    //     stop: true
    // },

    {
        type: 'proj',
        enerReq: 10,
        key: 'fireball',
        frame: 'fireball',
        cooldown: 10,
        userAnim: animNinja.block[0],
        stop: true,
        dmg: 10,
        enemyCollide: `
        (function(enemy){
            enemy.body.velocity.x = 0;            
            enemy.body.velocity.y = -400;
        }.bind(this))(enemy);
            `,
        bullet: {
            number: 1,
            speed: 500,
            scaleX: 0.3,
            scaleY: 0.3,
            repeat: true
        },
        offsetX: 0,
        offsetY: -30
    },
    {
        type: 'melee',
        enerReq: 10,
        key: undefined,
        frame: undefined,
        cooldown: 0,
        userAnim: animNinja.attack[0],
        stop: false,
        dmg: 20,
        enemyCollide: `
        (function(enemy){
            enemy.body.velocity.x = 0;          
        }.bind(this))(enemy);
        `,
        weapon: {
            offsetX: 50,
            offsetY: -30,
            height: 60,
            width: 50
        }
    },
    {
        type: 'block',
        enerReq: 0,
        key: undefined,
        frame: undefined,
        cooldown: 0,
        userAnim: animNinja.block[0],
        stop: false,
        bonusDefense: 5
    }
]
// that.playerNinja = new phinalphase.Player(that.game, 0, 0, 'playerNinja', 'Idle_000', 1000, 0.5, 1, -700, 300, 0.1, 0, anim, skills);
phinalphase.playerNinja = {
    x: 0,
    y: 0,
    key: 'playerNinja',
    frame: 'Idle_000',
    gravity: 1000,
    jumpHeight: -700,
    speed: 300,
    energyRegen: 0.1,
    defense: 0,
    anim: animNinja,
    skills: skillsNinja
}
// that.playerNinja.checkWorldBounds = true;
// that.playerNinja.walkingSound = new buzz.sound("/assets/Sound/footstep09", {
//     formats: ["ogg"],
//     volume: 20,
//     preload: true,
// });
// that.playerNinja.jumpSound = new buzz.sound("/assets/Sound/jump", {
//     formats: ["mp3"],
//     volume: 60,
//     preload: true,
// });
// that.playerNinja.swordSound = new buzz.sound("/assets/Sound/sword", {
//     formats: ["wav"],
//     volume: 60,
//     preload: true,
// });
// that.playerNinja.swordSound.setSpeed(0.6);

// that.playerNinja.hurtSound = new buzz.sound("/assets/Sound/pain2", {
//     formats: ["wav"],
//     volume: 60,
//     preload: true,
// });
// that.playerNinja.powerUpSound = new buzz.sound("/assets/Sound/teleport", {
//     formats: ["wav"],
//     volume: 60,
//     preload: true,
// });
// that.playerNinja.dieSound = new buzz.sound("/assets/Sound/player/die", {
//     formats: ["wav"],
//     volume: 60,
//     preload: true,
// });
// that.playerNinja.healSound = new buzz.sound("/assets/Sound/spell3", {
//     formats: ["wav"],
//     preload: true,
//     volume: 60
// });   




// that.playerNinja.playNinjaSounds = function () {
//     if (that.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !that.playerNinja.isInAir && !that.playerNinja.busy) {
//         that.playerNinja.walkingSound.play();
//     } else if (that.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !that.playerNinja.isInAir && !that.playerNinja.busy) {
//         that.playerNinja.walkingSound.play();
//     }
//     if (that.game.input.keyboard.isDown(Phaser.Keyboard.UP) && that.playerNinja.body.blocked.down) {
//         that.playerNinja.jumpSound.play();
//     }
//     if (that.playerNinja.isInAir && that.playerNinja.body.blocked.down) {
//         that.playerNinja.walkingSound.play();
//     }
//     if (that.game.input.keyboard.isDown(Phaser.Keyboard.L)) {
//         that.playerNinja.swordSound.play();
//     }
//     if (that.game.input.keyboard.isDown(Phaser.Keyboard.O)) {
//         that.playerNinja.powerUpSound.play();
//     }
//     if (that.playerNinja.isFlinched) {
//         that.playerNinja.hurtSound.play();
//     }
//     if (!that.playerNinja.alive) {
//         that.playerNinja.dieSound.play();
//     }
// }
// return that.playerNinja;
// }

phinalphase.updatePlayerNinja = function (that) {
    that.playerNinja.playNinjaSounds();
    that.playerNinja.updateCreature();
    if (that.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        that.playerNinja.act('RIGHT');
    } else if (that.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        that.playerNinja.act('LEFT');
    } else {
        if (!that.playerNinja.isInAir) {
            that.playerNinja.act();
        }
    }
    if (that.playerNinja.body.velocity.y > 0 && that.playerNinja.isInAir) {
        that.playerNinja.act('FALL');
    }
    if (that.game.input.keyboard.isDown(Phaser.Keyboard.UP) && !that.playerNinja.isInAir) {
        that.playerNinja.act('UP');
    }

    if (that.game.input.keyboard.isDown(Phaser.Keyboard.L)) {
        that.playerNinja.act('SKILL', 2);
    }

    if (that.game.input.keyboard.isDown(Phaser.Keyboard.O)) {
        that.playerNinja.act('SKILL', 0);
    }
    if (that.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
        that.playerNinja.act('SKILL', 1);
    }
    if (that.game.input.keyboard.isDown(Phaser.Keyboard.K)) {
        that.playerNinja.act('SKILL', 3);
    }

}