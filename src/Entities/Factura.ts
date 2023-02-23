import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ObjectType, Field, ID, Float, Int } from "type-graphql";
import { CuponDeDescuento } from "./CuponDeDescuento";
import { Envio } from "./Envio";
import { Users } from "./Users";
import { Books } from "./Books";
import { Factura_detalle } from "./Factura_detalllada";
import { Ciudad } from "./Ciudad";


@ObjectType()
@Entity()
export class Factura extends BaseEntity{

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(type => String)
    @Column()
    fecha!: String;

    @Field(type => Float)
    @Column({
        type: 'decimal',
        precision: 16, 
        scale: 2,
    })
    monto!: number;

    @Column({type: "varchar"})
    paymentID_MP!: string;

    @Field(type => CuponDeDescuento)
    @ManyToOne((type) => CuponDeDescuento, (cupon) => cupon.codigo, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'cod_cupon'})
    cupon!: CuponDeDescuento;

    @Field(type => Ciudad)
    @OneToOne((type) => Ciudad, (ciudad) => ciudad.cod_postal, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'cod_postal'})
    ciudad!: Ciudad;

    @Field(type => Envio)
    @OneToOne((type) => Envio, (envio) => envio.id, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'id_envio'})
    envio!: Envio;

    @ManyToOne((type) => Users, (user) => user.dni, {
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'dni'})
    users!: Users;

    @Field(type => Books)
    @ManyToOne((type) => Books, (books) => books.isbn, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'isbn'})
    book!: Books

    @Field(type => [Factura_detalle])
    @OneToMany((type) => Factura_detalle, (factura_detalle) => factura_detalle.factura, {
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    })
    factura_detalle: Factura_detalle[]
}