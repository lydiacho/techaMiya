interface Attribute {
  trait_type: string;
  value: string;
}

export interface MetaDataType {
  name: string;
  image: string;
  description?: string;
  attributes?: Attribute[];
}
