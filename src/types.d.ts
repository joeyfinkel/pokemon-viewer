export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T];
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
type numberTest = 1 | 2 | 3 | 4;
export type ResourceUrl<T extends ResourceOptions> =
  `https://pokeapi.co/api/v2/${T}`;
export type ResourceEndpointObject = { [x in ResourceOptions]: ResourceUrl<x> };
export type ResourceEntries = Entries<ResourceEndpointObject>;
type URL<T extends ResourceOptions, U extends number> = {
  [x in U]: `${ResourceUrl<T>}/${U}`;
};
export type Result<T extends ResourceOptions, U extends number> = {
  name: string;
  url: URL<T, U>;
};
type Results<T extends ResourceOptions> = {
  [x in ResourceOptions]: Result<x, 8>;
}[T];
type Next<
  T extends ResourceOptions,
  O extends number = 20,
  L extends number = 20
> = `${ResourceUrl<T>}?offset=${O}&limit=${L}`;
export type ResourceFor<T extends ResourceOptions> = {
  count: number;
  next: Next<T, 40> | null;
  previous: null;
  results: Results<T>[];
};
