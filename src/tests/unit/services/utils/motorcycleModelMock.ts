enum MotorcycleCategory {
  Custom = "Custom",
  Street = "Street",
  Trail = "Trail"
}

interface IMotorcycle {
  _id: string;
  model: string;
  year: number;
  color: string;
  buyValue: number;
  category: MotorcycleCategory,
  engineCapacity: number,
}


const data: IMotorcycle[] = [
  {
    _id: "62905e472ab42302a46b5fdd",
    model: "Honda CG Titan 125",
    year: 1963,
    color: "red",
    buyValue: 3500,
    category: MotorcycleCategory.Custom,
    engineCapacity: 2
  }
]

export const motorcycleModelMock = {
  create: async (obj: IMotorcycle): Promise<IMotorcycle> => {
    return data[0]
  },

  read:  async (): Promise<IMotorcycle[]> => {
    return data;
  },

  readOne: async(id: string): Promise<IMotorcycle | null> => {
    if (data[0]._id !== id) return null;
    return data[0];
  },

  update: async (id: string, obj: IMotorcycle): Promise<IMotorcycle | null> => {
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

  delete: async (id: string): Promise<IMotorcycle | null> => {
    const findCar = data.find((car) => car._id === id);

    if (!findCar) return null;

    return data[0];
  }
}