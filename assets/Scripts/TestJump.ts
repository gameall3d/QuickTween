
import { _decorator, Component, Node, Vec3, Camera } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('TestJump')
export class TestJump extends Component {
    
    @property({type: Node})
    public testCube: Node;

    @property({type: Camera})
    public testCamera: Camera;


    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    public onButtonClicked() {
        this.testCube.position = Vec3.ZERO;
        // this.testCube.qtPosition(new Vec3(0, 1, 1), 1)
        // this.testCube.qtJumpPosition(new Vec3(3, 0, 0), 3, 1, 1)
        // .then(this.testCube.qtJumpPosition(new Vec3(0, 0, 0), 3, 1, 1)).union().repeat(5).start();
        // this.testCube.qtJumpPosition(new Vec3(3, 1, 0), 3, 2, 2, {
        //     onComplete: ()=> {
        //         console.log('end');
        //     }
        // }).start();
        // this.testCube.qtPunchScale(new Vec3(1, 1, 1), 1, {
        //     onStart: ()=> {
        //         console.log('begin');
        //     },
        //     onComplete: ()=> {
        //         console.log('end');
        //     }
        // }).start();
        // this.testCube.qtShakePosition(1, 1).start();
        this.testCamera.qtShakePosition(new Vec3(0.1, 0.1, 0), 1, {
            onStart: ()=> {
                console.log('begin');
            },
            onComplete: ()=> {
                console.log('end');
            }
        }).start();
        // this.testCube.qtShakeRotation(1, 90).start();
        // this.testCube.qtShakeScale(1, 1).start();
    }
}

