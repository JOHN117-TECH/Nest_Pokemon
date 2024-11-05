import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly configService: ConfigService

  ) {
    this.defaultLimit = this.configService.get<number>("defaultLimit");
  }
  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }


  }

  async findAll(QueryParamsDtos: PaginationDto): Promise<Pokemon[]> {
    try {

      const { limit = this.defaultLimit, offset = 0, search } = QueryParamsDtos;

      const searchFilter = search ? { name: { $regex: search, $options: 'i' } } : {};

      const pokemons = await this.pokemonModel.find().find(searchFilter).limit(limit).skip(offset);
      return pokemons;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Can't fetch pokemons - check server logs");
    }
  }


  async findOne(term: string): Promise<Pokemon> {
    let pokemon: Pokemon;

    //Si esto es un numero
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term })
    }

    //MogoID
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term)
    }

    //Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.trim() })
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon> {

    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toObject(), ...updatePokemonDto };

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string): Promise<string> {

    /* const pokemon = await this.findOne(id);
    await pokemon.deleteOne(); */
    // const result = await this.pokemonModel.findByIdAndDelete( id );
    //const result = await this.pokemonModel.deleteMany(); // delete * from pokemon
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id "${id}" not found`);


    return `This action removes a "${id}" pokemon`;
  }

  async removeAll(): Promise<void> {
    await this.pokemonModel.deleteMany();
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }
}
