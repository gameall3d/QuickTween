declare module 'cc' {

    interface IPunchTweenOption extends ITweenOption {
        // How much the punch will vibrate
        vibrato?: number,
        // Represents how much (0 to 1) the vector will go beyond the starting position
        // when bouncing backwards. 1 creates a full oscillation between the punch direction and the 
        // opposite direction, while 0 oscillates only between the punch and the start scale.
        elasticity?: number
    }

    interface IShakeTweenOption extends ITweenOption {
        vibrato?: number    //每秒振动次数
        randomness?: number // 随机角度值
        fadeOut?: boolean    // 是否淡出
    }

    interface Node {
        /**
         * @zh
         * 移动目标的坐标到指定位置
         * @en
         * Moves the target's position to the given value
         * @param to dest position
         * @param duration time in seconds
         * @param {ITweenOption} opts options for tween
         * @param {Function} opts.onStart start callback
         */
        qtPosition(to: Vec3, duration: number, opts?: ITweenOption): Tween<Node>;
        /**
         * @zh
         * 移动目标的坐标到指定位置, 只移动X坐标
         * @en
         * Moves the target's position to the given value, tweening only the X axis.
         * @param to dest position
         * @param duration time in seconds
         * @param opts options for tween
         */
        qtPositionX(to: number, duration: number, opts?: ITweenOption): Tween<Node>;
        /**
         * @zh
         * 移动目标的坐标到指定位置, 只移动Y坐标
         * @en
         * Moves the target's position to the given value, tweening only the Y axis.
         * @param to dest position
         * @param duration time in seconds
         * @param opts options for tween
         */
        qtPositionY(to: number, duration: number, opts?: ITweenOption): Tween<Node>;
        /**
         * @zh
         * 移动目标的坐标到指定位置, 只移动Z坐标
         * @en
         * Moves the target's position to the given value, tweening only the Z axis.
         * @param to dest position
         * @param duration time in seconds
         * @param opts options for tween
         */
        qtPositionZ(to: number, duration: number, opts?: ITweenOption): Tween<Node>;
        /**
         * @zh
         * 移动目标的世界坐标到指定位置
         * @en
         * Moves the target's worldPosition to the given value
         * @param to dest position
         * @param duration time in seconds
         * @param opts options for tween
         */
        qtWorldPosition(to: Vec3, duration: number, opts?: ITweenOption): Tween<Node>;
        /**
         * @zh
         * 移动目标的世界坐标到指定位置, 只移动X坐标
         * @en
         * Moves the target's worldPosition to the given value, tweening only the X axis.
         * @param to dest position
         * @param duration time in seconds
         * @param opts options for tween
         */
        qtWorldPositionX(to: number, duration: number, opts?: ITweenOption): Tween<Node>;
        /**
         * @zh
         * 移动目标的世界坐标到指定位置, 只移动Y坐标
         * @en
         * Moves the target's worldPosition to the given value, tweening only the Y axis.
         * @param to dest position
         * @param duration time in seconds
         * @param opts options for tween
         */
        qtWorldPositionY(to: number, duration: number, opts?: ITweenOption): Tween<Node>;
        /**
         * @zh
         * 移动目标的世界坐标到指定位置, 只移动Z坐标
         * @en
         * Moves the target's worldPosition to the given value, tweening only the Z axis.
         * @param to dest position
         * @param duration time in seconds
         * @param opts options for tween
         */
        qtWorldPositionZ(to: number, duration: number, opts?: ITweenOption): Tween<Node>;
        /**
         * @zh
         * 旋转目标到指定值
         * @en
         * Rotates the target to ghe given value
         * @param to dest rotation in eulerAngle
         * @param duration time in seconds
         * @param opts options for tween
         */
        qtRotation(to: Vec3, duration: number, opts?: ITweenOption): Tween<Node>;
        /**
         * @zh
         * 旋转目标到指定值
         * @en
         * Rotates the target to ghe given value
         * @param to dest rotation in quaternion
         * @param duration time in seconds
         * @param opts options for tween
         */      
        qtRotationQuat(to: Quat, duration: number, opts?: ITweenOption): Tween<Node>;
        /**
         * @zh
         * 缩放目标到指定值
         * @en
         * Scales the target to ghe given value
         * @param to dest scale value
         * @param duration time in seconds
         * @param opts options for tween
         */         
        qtScale(to: Vec3|number, duration: number, opts?: ITweenOption): Tween<Node>;
        /**
         * @zh
         * 缩放目标到指定值，只影响X轴
         * @en
         * Scales the target to ghe given value, tweening only X axis
         * @param to dest scale value
         * @param duration time in seconds
         * @param opts options for tween
         */
        qtScaleX(to: number, duration: number, opts?: ITweenOption): Tween<Node>;
        /**
         * @zh
         * 缩放目标到指定值，只影响Y轴
         * @en
         * Scales the target to ghe given value, tweening only Y axis
         * @param to dest scale value
         * @param duration time in seconds
         * @param opts options for tween
         */
        qtScaleY(to: number, duration: number, opts?: ITweenOption): Tween<Node>;
        /**
         * @zh
         * 缩放目标到指定值，只影响Z轴
         * @en
         * Scales the target to ghe given value, tweening only Z axis
         * @param to dest scale value
         * @param duration time in seconds
         * @param opts options for tween
         */
        qtScaleZ(to: number, duration: number, opts?: ITweenOption): Tween<Node>;

        /**
         * @zh
         * 击打目标位置到指定方向，然后回到初始值
         * @en
         * Punches a position towards the given direction and then 
         * back to the starting one as if it was connected to the starting position 
         * via an elastic.
         * @param punch The direction and strength of the punch, (added to the node's current position)
         * @param duration Time in seconds
         * @param {IPunchTweenOption} opts punch tween options
         * @param {number} opts.vibrato How much the punch will vibrate
         * @param {number} opts.elasticity Represents how much (0 to 1) the vector will go beyond the starting position
         *  when bouncing backwards. 1 creates a full oscillation between the punch direction and the 
         * opposite direction, while 0 oscillates only between the punch and the start position.
         */
        qtPunchPosition(punch: Vec3, duration: number, opts?: IPunchTweenOption): Tween<Node>;

        /**
         * @zh
         * 击打目标旋转方向到指定值，然后回到初始值
         * @en
         * Punches a rotation to the given value and then back to the starting one as if it was connected 
         * to the starting rotation via an elastic.
         * @param punch The strength of punch, (added to the node's current rotation)
         * @param duration Time in seconds
         * @param {IPunchTweenOption} opts punch tween options
         * @param {number} opts.vibrato How much the punch will vibrate
         * @param {number} opts.elasticity Represents how much (0 to 1) the vector will go beyond the starting position
         *  when bouncing backwards. 1 creates a full oscillation between the punch direction and the 
         * opposite direction, while 0 oscillates only between the punch and the start rotation.
         */
        qtPunchRotation(punch: Vec3, duration: number, opts?: IPunchTweenOption): Tween<Node>;

        /**
         * @zh
         * 击打目标缩放到指定值，然后回到初始值
         * @en
         * Punches a scale to the given value and then back to the starting one as if it was connected 
         * to the starting scale via an elastic.
         * @param punch The strength of punch, (added to the node's current scale)
         * @param duration Time in seconds
         * @param {IPunchTweenOption} opts punch tween options
         * @param {number} opts.vibrato How much the punch will vibrate
         * @param {number} opts.elasticity Represents how much (0 to 1) the vector will go beyond the starting position
         *  when bouncing backwards. 1 creates a full oscillation between the punch direction and the 
         * opposite direction, while 0 oscillates only between the punch and the start scale.
         */
        qtPunchScale(punch: Vec3, duration: number, opts?: IPunchTweenOption): Tween<Node>;

        jumpX?: number;
        jumpY?: number;
        jumpZ?: number;
        jumpOffsetY?: number;
        /**
         * @zh
         * 缓动目标的坐标到指定值，在移动过程中同时附加一个Y坐标的高度值来模拟跳跃动作
         * @en
         * Tweens the target's position to the given value, while also applying a jump effect along the Y axis.
         * @param to 目标坐标值
         * @param jumpHeight 跳跃高度
         * @param jumpNum 跳跃次数
         * @param duration 时间
         * @param opts tween options
         */
        qtJumpPosition(to: Vec3, jumpHeight: number, jumpNum: number, duration: number, opts?: ITweenOption): Tween<Node>;

        /**
         * @zh
         * 使目标的位置在设定的参数下抖动
         * @en
         * Shakes the target's position with the given values
         * @param strength 强度
         * @param duration 时间
         * @param {IShakeTweenOption} opts shake tween options
         * @param {number} opts.vibrato 每秒振动次数
         * @param {number} opts.randomness 随机角度值
         * @param {boolean} opts.fadeOut 是否淡出
         */
        qtShakePosition(strength: Vec3|number, duration: number, opts?: IShakeTweenOption): Tween<Node>;

        /**
         * @zh
         * 使目标的旋转在设定的参数下抖动
         * @en
         * Shakes the target's rotation with the given values
         * @param strength 强度
         * @param duration 时间
         * @param {IShakeTweenOption} opts shake tween options
         * @param {number} opts.vibrato 每秒振动次数
         * @param {number} opts.randomness 随机角度值
         * @param {boolean} opts.fadeOut 是否淡出
         */
        qtShakeRotation(strength: Vec3|number, duration: number, opts?: IShakeTweenOption): Tween<Node>;

        /**
         * @zh
         * 使目标的缩放在设定的参数下抖动
         * @en
         * Shakes the target's scale with the given values
         * @param strength 强度
         * @param duration 时间
         * @param {IShakeTweenOption} opts shake tween options
         * @param {number} opts.vibrato 每秒振动次数
         * @param {number} opts.randomness 随机角度值
         * @param {boolean} opts.fadeOut 是否淡出
         */
        qtShakeScale(strength: Vec3|number, duration: number, opts?: IShakeTweenOption): Tween<Node>;   
    }

    interface Sprite {
        qtColor(to: Color, duration: number, opts?: ITweenOption): Tween<Sprite>;
        qtOpacity(to: number, duration: number, opts?: ITweenOption): Tween<Sprite>;
    }

    interface Camera {
        /**
         * @zh
         * 使目标的位置在设定的参数下抖动
         * @en
         * Shakes the target's position with the given values
         * @param strength 强度
         * @param duration 时间
         * @param {IShakeTweenOption} opts shake tween options
         * @param {number} opts.vibrato 每秒振动次数
         * @param {number} opts.randomness 随机角度值
         * @param {boolean} opts.fadeOut 是否淡出
         */
        qtShakePosition(strength: Vec3|number, duration: number, opts?: IShakeTweenOption): Tween<Node>;
    }
}