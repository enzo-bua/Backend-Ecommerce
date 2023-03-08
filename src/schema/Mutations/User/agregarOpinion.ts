import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../../../config";
import { agregarOpinion } from "../../../TypeOrm/Mutations/Usuario/agregarOpinion";
import { Send } from "../../../TypesDefs/Send";


export async function AgregarOpinion(coment: string, isbn: string, tokenUser: string) {

    const message = new Send()

    try{
        const id = parseInt(<string>verify(tokenUser, <string>JWT_SECRET))

        await agregarOpinion(coment, isbn, id)

        message.message = "Opinion agregada correctamente";
        message.success = true;

        return message;

    }catch(error: any) {
        message.message = error;
        message.success = false;

        return message;
    }
}