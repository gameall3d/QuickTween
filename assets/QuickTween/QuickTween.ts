
import { Component, Node, Vec3, tween, Quat, Sprite, Color, math, easing } from 'cc';
import { calcPunchData, clampLength } from './Util';

//////////////////////
// Transform
//////////////////////
Node.prototype.qtPosition = function(to: Vec3, duration: number) {
    return tween(this).to(duration, { position: to });
}

Node.prototype.qtPositionX = function(to: number, duration: number) {
    const startPos = this.position;
    return tween(this).to(duration, { position: new Vec3(to, startPos.y, startPos.z) });
}

Node.prototype.qtPositionY = function(to: number, duration: number) {
    const startPos = this.position;
    return tween(this).to(duration, { position: new Vec3(startPos.x, to, startPos.z) });
}

Node.prototype.qtPositionZ = function(to: number, duration: number) {
    const startPos = this.position;
    return tween(this).to(duration, { position: new Vec3(startPos.x, startPos.y, to) });
}

Node.prototype.qtWorldPosition = function(to: Vec3, duration: number) {
    return tween(this).to(duration, { worldPosition: to });
}

Node.prototype.qtWorldPositionX = function(to: number, duration: number) {
    const startPos = this.worldPosition;
    return tween(this).to(duration, { worldPosition: new Vec3(to, startPos.y, startPos.z) });
}

Node.prototype.qtWorldPositionY = function(to: number, duration: number) {
    const startPos = this.worldPosition;
    return tween(this).to(duration, { worldPosition: new Vec3(startPos.x, to, startPos.z) });
}

Node.prototype.qtWorldPositionZ = function(to: number, duration: number) {
    const startPos = this.worldPosition;
    return tween(this).to(duration, { worldPosition: new Vec3(startPos.x, startPos.y, to) });
}

Node.prototype.qtRotation = function(to: Vec3, duration: number) {
    return tween(this).to(duration, { eulerAngles: to });
}

Node.prototype.qtRotationQuat = function(to: Quat, duration: number) {
    return tween(this).to(duration, { rotation: to });
}

Node.prototype.qtScale = function(to: Vec3|number, duration: number) {
    let toScale = to;
    if (!(to instanceof Vec3)) {
        toScale = new Vec3(to, to, to);
    }

    return tween(this).to(duration, { scale: toScale });
}

Node.prototype.qtScaleX = function(to: number, duration: number) {
    const startScale = this.scale;
    return tween(this).to(duration, { scale: new Vec3(to, startScale.y, startScale.z) });
}

Node.prototype.qtScaleY = function(to: number, duration: number) {
    const startScale = this.scale;
    return tween(this).to(duration, { scale: new Vec3(startScale.x, to, startScale.z) });
}

Node.prototype.qtScaleZ = function(to: number, duration: number) {
    const startScale = this.scale;
    return tween(this).to(duration, { scale: new Vec3(startScale.x, startScale.y, to) });
}

Node.prototype.qtPunchPosition = function(punch: Vec3, duration: number, vibrato: number = 3, elasticity: number = 0.5) {
    const {durations, tos} = calcPunchData(this.position.clone(), punch, duration, vibrato, elasticity);

    const punchTween = tween(this);
    tos.forEach((to, index) => {
        const d = durations[index];
        punchTween.then(tween().to(d, {position: to}));
    });

    return punchTween.union();
}

Node.prototype.qtPunchRotation = function(punch: Vec3, duration: number, vibrato: number = 3, elasticity: number = 0.5) {
    const {durations, tos} = calcPunchData(this.rotation.clone(), punch, duration, vibrato, elasticity);

    const punchTween = tween(this);
    tos.forEach((to, index) => {
        const d = durations[index];
        punchTween.then(tween().to(d, {eulerAngles: to}));
    });

    return punchTween.union();
}

Node.prototype.qtPunchScale = function(punch: Vec3, duration: number, vibrato: number = 3, elasticity: number = 0.5) {
    const {durations, tos} = calcPunchData(this.scale.clone(), punch, duration, vibrato, elasticity);

    const punchTween = tween(this);
    tos.forEach((to, index) => {
        const d = durations[index];
        punchTween.then(tween().to(d, {scale: to}));
    });

    return punchTween.union();
}

Node.prototype.qtJumpPosition = function(to: Vec3, jumpHeight: number, jumpNum: number, duration: number) {
    const tweenPos = new Vec3();
    const jumpTween = tween(this);
    const totalNum = jumpNum * 2;

    this.jumpY = 0;
    let startPosY = 0;
    const yUpTween = tween().to(duration / totalNum, { jumpY: jumpHeight }, {
        onStart: (target: Node) => {
            startPosY = target.position.y;
            target.jumpY = 0;
        },
        onUpdate: (target: Node, ratio) => {
            tweenPos.set(target.position);
            tweenPos.y = startPosY + target.jumpY;
            target.position = tweenPos;
        },
        onComplete: (target: Node) => {
            target.jumpY = 0;
        }, easing: 'quadOut'
    }).to(duration / totalNum, { jumpY: jumpHeight }, {
        onStart: (target: Node) => {
            startPosY = target.position.y;
        },
        onUpdate: (target: Node, ratio) => {
            tweenPos.set(target.position);
            tweenPos.y = startPosY - target.jumpY;
            target.position = tweenPos;
        },
        onComplete: (target: Node) => {
            target.jumpY = 0;
        }, easing: 'quadIn',
    }).union().repeat(jumpNum);

    this.jumpOffsetY = 0;
    let offsetY = 0;
    const offsetYTween = tween().to(duration, { jumpOffsetY: to.y - this.position.y }, {
        onStart: (target: Node) => {
            offsetY = to.y - target.position.y;
            target.jumpOffsetY = 0;
        },
        onUpdate: (target: Node, ratio) => {
            const interpOffsetY = easing.quadOut(ratio) * offsetY;
            tweenPos.set(target.position);
            tweenPos.y += interpOffsetY;
            target.position = tweenPos;
        },
        onComplete: (target: Node) => {
            target.jumpOffsetY = 0;
        }, easing: 'quadOut'
    });

    this.jumpX = this.position.x;
    this.jumpZ = this.position.z;
    const xzTween = tween().to(duration, { jumpX: to.x, jumpZ: to.z }, {
        onUpdate: (target: Node, ratio) => {
            tweenPos.set(target.position);
            tweenPos.x = target.jumpX;
            tweenPos.z = target.jumpZ;
            target.position = tweenPos;
        },
        onComplete: (target: Node) => {
            // delete target.jumpX;
            // delete target.jumpY;
            // delete target.jumpZ;
            // delete target.jumpOffsetY;
            target.jumpX = target.position.x;
            target.jumpZ = target.position.z;
        }
    })

    jumpTween.parallel(yUpTween, offsetYTween, xzTween);
    return jumpTween;
}

//////////////////////
// Sprite
//////////////////////
// good color lerp
// https://www.alanzucconi.com/2016/01/06/colour-interpolation/
Sprite.prototype.qtColor = function(to: Color, duration: number) {
    return tween(this).to(duration, { color: to });
}

Sprite.prototype.qtOpacity = function(to: number, duration: number) {
    const startColor = this.color.clone();
    const tempColor = new Color();
    return tween(this).to(duration, { color: new Color(startColor.r, startColor.g, startColor.b, to) }, {
        onUpdate: (target: {_val: number}, ratio: number) => {
            const lerpA = startColor.a + (to - startColor.a) * ratio
            tempColor.set(startColor.r, startColor.g, startColor.b, lerpA);
            this.color = tempColor;
    }});
}