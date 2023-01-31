export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T];
type y = Entries<Pokemon['sprites']>;
// Pokemon Types
export type ResourceOptions =
  | 'ability'
  | 'berry'
  | 'berry-firmness'
  | 'berry-flavor'
  | 'characteristic'
  | 'contest-effect'
  | 'contest-type'
  | 'egg-group'
  | 'encounter-condition'
  | 'encounter-condition-value'
  | 'encounter-method'
  | 'evolution-chain'
  | 'evolution-trigger'
  | 'gender'
  | 'generation'
  | 'growth-rate'
  | 'item'
  | 'item-attribute'
  | 'item-category'
  | 'item-fling-effect'
  | 'item-pocket'
  | 'language'
  | 'location'
  | 'location-area'
  | 'machine'
  | 'move'
  | 'move-ailment'
  | 'move-battle-style'
  | 'move-category'
  | 'move-damage-class'
  | 'move-learn-method'
  | 'move-target'
  | 'nature'
  | 'pal-park-area'
  | 'pokeathlon-stat'
  | 'pokedex'
  | 'pokemon'
  | 'pokemon-color'
  | 'pokemon-form'
  | 'pokemon-habitat'
  | 'pokemon-shape'
  | 'pokemon-species'
  | 'region'
  | 'stat'
  | 'super-contest-effect'
  | 'type'
  | 'version'
  | 'version-group';

export type TypeOptions =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'unknown'
  | 'shadow';

export type ResourceType<T extends ResourceOptions, R> = { [x in T]: R }[T];
export type ResourceUrl<T extends ResourceOptions> =
  `https://pokeapi.co/api/v2/${T}`;
export type ResourceUrlWithLimit<
  Resource extends ResourceOptions,
  Limit extends number,
  Offset extends number = 0
> = `https://pokeapi.co/api/v2/${Resource}?limit=${Limit}&offset=${Offset}`;
export type ResourceEndpoint<T extends ResourceOptions> = ResourceUrl<T>;
export type ResourceEndpointObject = { [x in ResourceOptions]: ResourceUrl<x> };
// export type ResourceEntries = Entries<ResourceEndpointObject>;
// type URL<T extends ResourceOptions, U extends number> = {
//   [x in U]: `${ResourceUrl<T>}/${U}`;
// };
// export type Result<T extends ResourceOptions, U extends number> = {
//   name: string;
//   url: URL<T, U>;
// };
// type Results<T extends ResourceOptions> = {
//   [x in ResourceOptions]: Result<x, 8>;
// }[T];
// type Next<
//   T extends ResourceOptions,
//   O extends number = 20,
//   L extends number = 20
// > = `${ResourceUrl<T>}?offset=${O}&limit=${L}`;
// export type ResourceFor<T extends ResourceOptions> = {
//   count: number;
//   next: string | null;
//   previous: null;
//   results: NamedAPIResource<T>[];
// };
export type ResourceFor<
  T extends ResourceOptions,
  R extends string = string
> = {
  count: number;
  next: string | null;
  previous: null;
  results: NamedAPIResource<ResourceType<T, R>>[];
};

interface Ability {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: Generation;
  names: Name[];
  effect_entries: VerboseEffect[];
  effect_changes: AbilityEffectChange[];
  flavor_text_entries: AbilityFlavorText[];
  pokemon: AbilityPokemon[];
}

interface APIResource {
  url: string;
}

interface Language {
  id: number;
  name: string;
  official: boolean;
  iso639: string;
  iso3166: string;
  names: Name[];
}

interface NamedAPIResource<T extends string = string> {
  name: T;
  url: string;
}

interface Name {
  name: string;
  language: Language;
}

interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: Ability;
}

interface PokemonForm {
  id: number;
  name: string;
  order: number;
  form_order: number;
  is_default: boolean;
  is_battle_only: boolean;
  is_mega: boolean;
  form_name: string;
  pokemon: Pokemon;
  types: PokemonFormType;
  sprites: Sprites;
  version_group: VersionGroup;
  form_names: Name[];
}

interface Version {
  id: number;
  name: string;
  names: Name[];
  version_group: VersionGroup;
}

interface VersionGroup {
  id: number;
  name: string;
  order: number;
  generation: Generation;
  move_learn_methods: MoveLearnMethod[];
  pokedexes: Pokedex[];
  regions: Region[];
  versions: Version[];
}

interface VersionGameIndex {
  game_index: number;
  version: Version;
}

interface HeldItemVersion {
  version: Version;
  rarity: number;
}

interface HeldItem {
  item: Item;
  version_details: HeldItemVersion[];
}

interface Type {
  id: number;
  name: string;
  damage_relations: TypeRelations;
  past_damage_relations: TypeRelations[];
  game_indices: GenerationGameIndex[];
  generation: Generation;
  move_damage_class: MoveDamageClass;
  names: Name[];
  pokemon: TypePokemon[];
  moves: Move[];
}

interface TypePokemon {
  slot: number;
  pokemon: Pokemon;
}

interface PokemonMoveVersion {
  move_learn_method: MoveLearnMethod;
  version_group: VersionGroup;
  level_learned_at: number;
}

interface PokemonMove {
  move: Move;
  version_group_details: PokemonMoveVersion[];
}

interface PokemonType {
  slot: number;
  type: NamedAPIResource<TypeOptions>;
}

interface PokemonTypePast {
  generation: Generation;
  types: PokemonType[];
}

export interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
}

interface Stat {
  id: number;
  name: string;
  game_index: number;
  is_battle_only: boolean;
  affecting_moves: MoveStatAffectSets;
  affecting_natures: NatureStatAffectSets;
  characteristics: Characteristic[];
  move_damage_class: MoveDamageClass;
  names: Name[];
}

interface PokemonStat {
  stat: Stat;
  effort: number;
  base_stat: number;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: PokemonForm[];
  game_indices: VersionGameIndex[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  past_types: PokemonTypePast[];
  sprites: PokemonSprites;
  species: PokemonSpecies;
  stats: PokemonStat[];
  types: PokemonType[];
}

export interface PokemonWithLimit {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: GrowthRate;
  pokedex_numbers: PokemonSpeciesDexEntry[];
  egg_groups: EggGroup[];
  color: PokemonColor;
  shape: PokemonShape;
  evolves_from_species: NamedAPIResource;
  evolution_chain: APIResource;
  habitat: PokemonHabitat;
  generation: Generation;
  names: Name[];
  pal_park_encounters: PalParkEncounterArea[];
  flavor_text_entries: FlavorText[];
  form_descriptions: Description[];
  genera: Genus[];
  varieties: PokemonSpeciesVariety[];
}

interface ChainLink {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

export interface EvolutionChain {
  id: number;
  baby_trigger_item: Item;
  chain: ChainLink;
}
