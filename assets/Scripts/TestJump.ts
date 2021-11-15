
import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('TestJump')
export class TestJump extends Component {
    
    @property({type: Node})
    public testCube: Node;



    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    public onButtonClicked() {
        this.testCube.position = Vec3.ZERO;
        // this.testCube.qtJumpPosition(new Vec3(3, 0, 0), 3, 1, 1)
        // .then(this.testCube.qtJumpPosition(new Vec3(0, 0, 0), 3, 1, 1)).union().repeat(5).start();
        // this.testCube.qtJumpPosition(new Vec3(3, 1, 0), 3, 1, 1).start();
        this.testCube.qtPunchScale(new Vec3(1, 1, 1), 1, 10, 1).start();
    }
}

