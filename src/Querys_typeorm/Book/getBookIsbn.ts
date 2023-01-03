import { Books } from "../../Entities/Books";

export async function getBookIsbn(isbn: string) {

    const book = await Books.find({
        where: {
            isbn: isbn
        }
    })

    if (!book[0]){
        throw `ERROR, EL LIBRO CON ISBN ${isbn} NO EXISTE`
    }

    return book;
}