import axios from 'axios';
import {
  Pokemon,
  ResourceFor,
  ResourceOptions,
  ResourceUrl,
  ResourceUrlWithLimit,
  TypeOptions,
} from '../types';
import { capitalizeWord } from './utils';

export namespace PokemonUtils {
  /**
   * Gets the url of a resource.
   * @param resource The type of resource to fetch.
   * @param limit The number of results to fetch.
   * @param offset The offset to start fetching results from.
   * @returns The url of the resource.
   */
  export function getResourceUrl<T extends ResourceOptions>(
    resource: T
  ): ResourceUrl<T>;
  export function getResourceUrl<
    T extends ResourceOptions,
    L extends number,
    O extends number
  >(resource: T, limit: L, offset?: O): ResourceUrlWithLimit<T, L, O>;
  export function getResourceUrl<
    T extends ResourceOptions,
    L extends number,
    O extends number
  >(resource: T, limit?: L, offset?: O) {
    const url = `https://pokeapi.co/api/v2/${resource}`;

    if (limit) {
      return `${url}?limit=${limit}&offset=0` as const;
    }

    if (limit && offset) {
      return `${url}?limit=${limit}&offset=${offset}` as const;
    }

    return `https://pokeapi.co/api/v2/${resource}` as const;
  }

  export function getPokemonId(url: string) {
    return url
      .substring(url.lastIndexOf('pokemon/'))
      .replace('pokemon', '')
      .replaceAll('/', '');
  }

  /**
   * Fetches a resource from the PokeAPI.
   * @param resource The type of resource to fetch.
   * @param limit The number of results to fetch.
   * @param offset The offset to start fetching results from.
   * @returns The resource data.
   */
  export async function getResource<
    T extends ResourceOptions,
    R extends string = string
  >(resource: T): Promise<ResourceFor<T, R>>;
  export async function getResource<
    T extends ResourceOptions,
    R extends string = string
  >(resource: T, limit: number, offset?: number): Promise<ResourceFor<T, R>>;
  export async function getResource<
    T extends ResourceOptions,
    R extends string = string
  >(resource: T, limit?: number, offset?: number) {
    if (limit) {
      const url = getResourceUrl(resource, limit);
      const { data } = await axios.get<ResourceFor<T, R>>(url);

      return data;
    }

    if (limit && offset) {
      const url = getResourceUrl(resource, limit, offset);
      const { data } = await axios.get<ResourceFor<T, R>>(url);

      return data;
    }

    const url = getResourceUrl(resource);
    const { data } = await axios.get<ResourceFor<T, R>>(url);

    return data;
  }

  export async function getTypes() {
    const { results } = await getResource<'type', TypeOptions>('type');

    return results.map(({ name }) => name);
  }

  export function capitalizeName(pokemon: Pokemon | null): string;
  export function capitalizeName(name: string): string;
  export function capitalizeName(pokemon: Pokemon | string | null) {
    if (typeof pokemon === 'string') {
      const replaced = pokemon.replaceAll('_', ' ');

      return capitalizeWord(replaced);
    } else {
      const name = pokemon?.name;

      if (name) {
        const replaced = name.replaceAll('_', ' ');

        return capitalizeWord(replaced);
      }
    }

    return '';
  }
}
