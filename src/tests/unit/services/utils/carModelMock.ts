interface ICar {
  _id?: string;
  model?: string;
  year?: number;
  color?: string;
  buyValue?: number;
  seatsQty?: number;
  doorsQty?: number;
}

const data: ICar[] = [
  {
    _id: "62905e472ab42302a46b5fdf",
    model: "Uno",
    year: 1963,
    color: "blue",
    buyValue: 3500,
    seatsQty: 2,
    doorsQty: 2
  }
]

export const carModelMock = {
  create: async (obj: ICar): Promise<ICar> => {
    return {
      ...obj,
      _id: "62905e472ab42302a46b5fdf"
    }
  },

  read:  async (): Promise<ICar[]> => {
    return data;
  },

  readOne: async(id: string): Promise<ICar | null> => {
    if (data[0]._id !== id) return null;
    return data[0];
  },

  update: async (id: string, obj: ICar): Promise<ICar | null> => {
    const findCar = data.find((car) => car._id === id);
    
    if (!findCar) return null;

    const newData = data.map(car => {
      if (car._id === id) return ({
        ...car,
        ...obj
      })

      return data[0];
    })

    return newData[0];
  },

  delete: async (id: string): Promise<ICar | null> => {
    const findCar = data.find((car) => car._id === id);

    if (!findCar) return null;

    return data[0];
  }
}