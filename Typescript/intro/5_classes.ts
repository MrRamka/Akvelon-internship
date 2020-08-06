class TypeScript {
    version: string

    constructor(version: string) {
        this.version = version
    }

    info(name: string) {
        return `[${name}]: Version is ${this.version}`
    }
}

// class Car {
//     readonly model: string
//     readonly numberOfWheels: number = 4
//
//     constructor(model: string) {
//         this.model = model
//     }
// }

class Car {
    readonly numberOfWheels: number = 4

    constructor(readonly model: string) {
    }
}

//=================

class Animal {
    protected voice: string = ''
    public color: string = 'black'

    constructor() {
        this.go()
    }

    private go(): void {
        console.log('go')
    }

}

class Cat extends Animal {
    public setVoice(voice: string): void {
        this.voice = voice
    }
}
const cat = new Cat()
cat.color = '#ccc'
cat.setVoice('Test')

//========================== Abstract

abstract class Component {
    abstract render(): void
    abstract info(): void
}

class AppComponent extends Component{
    info(): void {
        console.log('info')
    }

    render(): void {
        console.log('render')
    }

}