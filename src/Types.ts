// Definir los modelos de la informacion para toda la aplicacion y que este mas ordenada
//Con DataContextType envolvemos todos los datos y con DataStructure agrupamos Info y Content que son campos de nuestros items.

export interface Info {
  id: number;
  position: [number, number, number];
}

export interface Content {
  url: string;
  miniature: string;
  desc: string;
  type: string;
  title: string;
}

export interface DataStructure {
  info: Info;
  content: Content[];
}

export interface DataContextType {
  data: DataStructure[];
  loading: boolean;
  error: string | null;
  fetchData: () => void;
  updateData: (updatedModel: DataStructure) => void;
  deleteModel: (id: number) => void;
  addModel: (newModel: DataStructure) => void;
}
