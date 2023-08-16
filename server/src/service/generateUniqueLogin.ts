export class generateUniqueLogin {
    generate():string{
        let nick = "user"
        let date = Date.now()
        return nick + date
    }
}

let a = new generateUniqueLogin().generate()
console.log(a)