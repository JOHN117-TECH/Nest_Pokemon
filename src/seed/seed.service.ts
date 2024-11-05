import { Injectable } from '@nestjs/common';
import { PokemonService } from '../pokemon/pokemon.service';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { POKEMON_SEED } from './data/pokemon.seed';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter
  ) { }

  private readonly axios: AxiosInstance = axios;
  async executeSeed() {

    /* await this.pokemonModel.create(POKEMON_SEED) */

    await this.pokemonModel.deleteMany();

    /* const { data } = await this.axios.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=10");*/
    const data = await this.http.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=10");

    /* data.results.forEach(async ({ name, url }) => {
      const segments = url.split("/");
      const no: number = +segments[segments.length - 2];

      const pokemon = await this.pokemonModel.create({ name, no });
    }); */


    /* INSERTAR MULTIPLES REGISTROS SIMULTANEAMENTE */

    const pokemonToInsert: { name: string, no: number }[] = []

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split("/");
      const no: number = +segments[segments.length - 2];

      pokemonToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return "SEED EXECUTED";
  }

}
