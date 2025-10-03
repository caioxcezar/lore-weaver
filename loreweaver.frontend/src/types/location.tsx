export interface Location {
  id: number;
  name: string;
  created: Date;
  lastEdit?: Date;
  shortDescription: string;
}

export enum GeographicType {
  Planet,
  Continent,
  Ocean,
  Island,
  Archipelago,
  Peninsula,
  Isthmus,
  Desert,
  Forest,
  Mountain,
  Plain,
  Valley,
  Swamp,
  Tundra,
  Glacier,
  River,
  Lake,
}

export enum PoliticalType {
  Kingdom,
  Empire,
  Republic,
  CityState,
  Tribe,
  Confederation,
  Duchy,
  County,
  Barony,
  Territory,
  FreeCity,
}
