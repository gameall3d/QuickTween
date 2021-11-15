import { math, Vec3 } from "cc";

export function clampLength(vec: Vec3, maxLength: number) {
    const clampVec = new Vec3();
    Vec3.normalize(clampVec, vec);
    Vec3.multiplyScalar(clampVec, clampVec, maxLength);
    return clampVec;
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
        durations,
        tos,
    }
}

function calcShakeData(strength: Vec3, duration: number, vibrato: number, randomness: number, ignoreZAxis: boolean, vectorBased: boolean) {
    const shakeMag = vectorBased ? strength.length() : strength.x;
    let toIterations = Math.floor(vibrato * duration);
    if (toIterations < 2) {
        toIterations = 2;
    }
    const deltaShakeMag = shakeMag / toIterations;
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

    const angle = math.randomRange(0, 360);
    const tos: Vec3[] =[];
}