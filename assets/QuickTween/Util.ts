import { KeyCode, math, Quat, Vec3 } from "cc";

export enum ShakeRandomnessMode {
    Harmonic,
    Full
}

export function clampLength(vec: Vec3, maxLength: number) {
    const clampVec = new Vec3();
    Vec3.normalize(clampVec, vec);
    Vec3.multiplyScalar(clampVec, clampVec, maxLength);
    return clampVec;
}

export function vec3FromAngle(degree: number, length: number) {
    const radian = math.toRadian(degree);
    return new Vec3(length * Math.cos(radian), length * Math.sign(radian), 0);
}

export function calcPunchData(start: Vec3, direction: Vec3, duration: number, vibrato: number, elasticity: number) {
    math.clamp01(elasticity);
    let strength = direction.length();
    let toIterations = Math.round(vibrato * duration);
    if (toIterations < 2) {
        toIterations = 2;
    }

    const deltaStrength = strength / toIterations;

    let durations = [];
    let sum = 0;
    for (let i = 0; i < toIterations; i++) {
        const iterationPercent = (i + 1) / toIterations;
        const deltaDuration = duration * iterationPercent;
        sum += deltaDuration;
        durations[i] = deltaDuration;
    }

    const durationMultiplier = duration / sum;
    durations = durations.map((d) => d * durationMultiplier );

    // create to vec3 array
    const tos: Vec3[] = [];
    for(let i = 0; i < toIterations; i++) {
        if (i < toIterations - 1) {
            if (i === 0) {
                tos[i] = Vec3.add(new Vec3(), start, direction);
            } else if (i % 2 !== 0) {
                const deltaVec = clampLength(direction, strength * elasticity);
                deltaVec.negative();
                tos[i] = deltaVec.add(start);
            } else {
                const deltaVec = clampLength(direction, strength);
                tos[i] = deltaVec.add(start);
            }
        } else {
            tos[i] = start;
        }

        strength -= deltaStrength;
    }

    return {
        tos,
        durations
    }
}

export function calcShakeData(duration: number, strength: Vec3, vibrato: number, randomness: number, ignoreZAxis: boolean, vectorBased: boolean,
    fadeOut: boolean, randomnessMode: ShakeRandomnessMode) {
        KeyCode
    let shakeLength = vectorBased ? strength.length() : strength.x;
    let toIterations = Math.floor(vibrato * duration);
    if (toIterations < 2) {
        toIterations = 2;
    }
    const deltaShakeLen = shakeLength / toIterations;
    let durations = [];
    let sum = 0;
    for (let i = 0; i < toIterations; i++) {
        const iterationPercent = (i + 1) / toIterations;
        const deltaDuration = fadeOut ? duration * iterationPercent : duration / toIterations;
        sum += deltaDuration;
        durations[i] = deltaDuration;
    }

    const durationMultiplier = duration / sum;
    durations = durations.map((d) => d * durationMultiplier );

    let angle = math.randomRange(0, 360);
    const tos: Vec3[] =[];

    for (let i = 0; i < toIterations; i++) {
        if (i < toIterations - 1) {
            let randQuat = new Quat();
            switch(randomnessMode) {
                case ShakeRandomnessMode.Harmonic:
                    if (i > 0) {
                        angle = angle - 180 + math.randomRange(0, randomness);
                    }
                    if (vectorBased || !ignoreZAxis) {
                        Quat.fromAxisAngle(randQuat, Vec3.UP, math.randomRange(0, randomness));
                    }
                    break;
                default:
                    if (i > 0) {
                        angle = angle - 180 + math.randomRange(-randomness, randomness);
                    }
                    if (vectorBased || !ignoreZAxis) {
                        Quat.fromAxisAngle(randQuat, Vec3.UP, math.randomRange(-randomness, randomness));
                    }
                    break;
            }

            if (vectorBased) {
                let to = vec3FromAngle(angle, shakeLength);
                Vec3.transformQuat(to, to, randQuat);
                to.x = clampLength(to, strength.x).x;
                to.y = clampLength(to, strength.y).y;
                to.z = clampLength(to, strength.z).z;
                to.normalize().multiplyScalar(shakeLength);
                tos[i] = to;
                if (fadeOut) {
                    shakeLength -= deltaShakeLen;
                }
                strength = clampLength(strength, shakeLength);
            } else {
                if (ignoreZAxis) {
                    tos[i] = vec3FromAngle(angle, shakeLength);
                } else {
                    let to = vec3FromAngle(angle, shakeLength);
                    Vec3.transformQuat(to, to, randQuat);
                    tos[i] = to;
                }

                if (fadeOut) {
                    shakeLength -= deltaShakeLen;
                }
            }
        } else {
            tos[i] = Vec3.ZERO;
        }
    }

    return {
        tos,
        durations
    }
}