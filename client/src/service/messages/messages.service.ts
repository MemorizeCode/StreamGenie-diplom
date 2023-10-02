import axios from "axios";


class Messages {

    constructor(){}

    public async getMessages(roomId:number){
        if(roomId == 1 || roomId == 2){
            const response = await axios.get(`http://localhost:5000/getmessages/:${roomId}`)
            return response.data
        }
        else{
            return "Доступны только 1 и 2 комната"
        }
    }

    public async sendMessages(text:string, roomId:number, name:string){
        if(roomId == 1 || roomId == 2){
            const response = await axios.post('http://localhost:5000/sendmessages',{
                text,roomId,name
            })
            return response
        }
        else{
            return "Доступны только 1 и 2 комната"
        }
    }
}

export default new Messages