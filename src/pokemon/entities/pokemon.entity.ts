import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {

    @Prop({
        unique: true,
        index: true,
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no: number;

}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon)

// Middleware pre-save para convertir el nombre a minúsculas antes de guardar
PokemonSchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.name = this.name.toLowerCase();
    }
    next();
});