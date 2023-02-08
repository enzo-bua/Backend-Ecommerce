import { ACCESS_TOKEN_MP } from "../../../config";
import { Users } from "../../../Entities/Users";
import { getCarrito } from "./getCarrito";

const mercadopago = require("mercadopago")

function Items(user: Users): Array<any> {

    let items: Array<any> = []

    if(user.carrito.items){

        user.carrito.items.forEach(item => {

            const PrecioTotal = item.book.precio
            let precio = PrecioTotal

            if (user.carrito.cupon != null){

                precio = precio -(+PrecioTotal * (user.carrito.cupon.cantidad_descuento/100))
            }

            items.push({
                id: user.dni,
                title: item.book.nombre,
                description: item.book.descripcion,
                quantity: (+item.cantidad),
                currency_id: "ARS",
                category: "Book",
                unit_price: +precio
            });
        });
    }
    return items
}


async function CrearLinkMercadoPago(user: Users, items: any): Promise<string> {

    const linkFront = ''
    mercadopago.configure({access_token: ACCESS_TOKEN_MP});

    const preference = {
        payer:{
            name: {
                first_name: user.nombre,
                last_name: user.apellido
            },
            email: user.email
        },
        items: items,
        back_urls:{
            success: `${linkFront}//checkout/success`,
            failure: `${linkFront}/checkout/failure`,
            pending: `${linkFront}/checkout/pending`,
        },
        auto_return: 'approved'
    };

    const link = mercadopago.preferences
    .create(preference)
    .then(function (response: any){
        return response.body.sandbox_init_point
    })
    .catch(function (error: any){
        console.log(error);
        return null;
    });

    return link
    
}

export async function realizarCompra(dni: number) {

    let response = ""

    const user = await getCarrito(dni)

    if(user){

        const items = Items(user[0])

        response = await CrearLinkMercadoPago(user[0], items)
    }
    
}