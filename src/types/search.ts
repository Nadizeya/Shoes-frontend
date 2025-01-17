export type ProductSearch = {
  id: number;
  name: string;
  description: string;
  original_price: number;
  discount_price: number;
  image: string | null;
};

export type BrandSearch = {
  id: number;
  name: string;
  image: string | null;
};

export type CategorySearch = {
  id: number;
  name: string;
  image: string | null;
};

export type SearchResult = {
  products: ProductSearch[];
  brands: BrandSearch[];
  categories: CategorySearch[];
};

export type QueryT = {
  value: string;
  tag: string;
};

export type SearchResutListT = {
  query: QueryT;
  setQuery: React.Dispatch<React.SetStateAction<QueryT>>;
  resultList: SearchResult | null;
};
