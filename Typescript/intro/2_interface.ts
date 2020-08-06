interface Rect {
    readonly id: string
    color?: string
    size: {
        width: number,
        height: number
    }
}

const rect1: Rect = {
    id: '123',
    size: {
        width: 1,
        height: 2
    },
    color: '#ccc'
}

const rect2: Rect = {
    id: '123',
    size: {
        width: 10,
        height: 2
    },
}
rect2.color = 'black';

const rect3 = {} as Rect;
const rect4 = <Rect>{}

//=============== Inheritance

interface RectWithArea extends Rect {
    getArea: () => number;
}

const rect5: RectWithArea = {
    getArea(): number {
        return this.size.height * this.size.width;
    },
    size: {height: 1, width: 3},
    id: 'asd'
}

//================= Implement
interface IClock {
    time: Date,

    setTime(date: Date): void
}

class Clock implements IClock {
    time: Date = new Date();

    setTime(date: Date): void {
        this.time = date
    }
}

// ===========
interface Styles {
    [key: string]: string
}

const css: Styles = {
    border: '1px solid black',
    marginTop: '2px'
}
