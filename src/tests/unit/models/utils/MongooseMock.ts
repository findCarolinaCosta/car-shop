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

export const MongooseMock = {
  create: async (obj: ICar): Promise<ICar> => {
    return {
      ...obj,
      _id: "62905e472ab42302a46b5fdf"
    }
  },

  find: async (): Promise<ICar[]> => {
    return data;
  },

  findOne: async({_id}: { _id: string }): Promise<ICar | null> => {
    if (data[0]._id !== _id) return null;
    return data[0];
  },

  findOneAndUpdate: async ({ _id }: {_id: string}, obj: ICar) => {
    const findCar = data.find((car) => car._id === _id);

    if (!findCar) return null;

    const newData = data.map(car => {
      if (car._id === _id) return ({
        ...car,
        ...obj
      })

      return data[0];
    })
    
    return newData[0];
  },

  findOneAndDelete: async ({_id}: { _id: string }): Promise<ICar | null> => {
    const findCar = data.find((car) => car._id === _id);

    if (!findCar) return null;

    return data[0];
  }
}