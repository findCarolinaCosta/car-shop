interface ICar {
  _id?: string;
  model?: string;
  year?: number;
  color?: string;
  buyValue?: number;
  seatsQty?: number;
  doorsQty?: number;
}

const dataCar: ICar[] = [
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

interface IMotorcycle {
  _id: string;
  model: string;
  year: number;
  color: string;
  buyValue: number;
  category: "Custom" | "Street" | "Trail",
  engineCapacity: number,
}


const dataMotorcycle: IMotorcycle[] = [
  {
    _id: "62905e472ab42302a46b5fdd",
    model: "Honda CG Titan 125",
    year: 1963,
    color: "red",
    buyValue: 3500,
    category: "Custom",
    engineCapacity: 2
  }
]

export const MongooseMock = {
  create: async (obj: ICar | IMotorcycle): Promise<ICar | IMotorcycle> => {
    if ("category" in obj) {
      return dataMotorcycle[0]
    }
    return dataCar[0]
  },

  find: async (): Promise<ICar[]> => {
    return dataCar;
  },

  findOne: async({_id}: { _id: string }): Promise<ICar | IMotorcycle | null> => {
    if (dataCar[0]._id !== _id && dataMotorcycle[0]._id !== _id) return null;

    if(_id === dataMotorcycle[0]._id) {
      return dataMotorcycle[0]
    }

    return dataCar[0];
  },

  findOneAndUpdate: async ({ _id }: {_id: string}, obj: ICar)
  : Promise<ICar | IMotorcycle | null> => {
    const findCar = dataCar.find((car) => car._id === _id);
    const findMotorcycle = dataMotorcycle.find((car) => car._id === _id);

    if (!findCar && !findMotorcycle) return null;

    const newDataMotorcycle: IMotorcycle[] = dataMotorcycle.map(motorcycle => {
      if (motorcycle._id === _id) return ({
        ...motorcycle,
        ...obj
      })
      return dataMotorcycle[0];
    });
    
    const newDataCar: ICar[] = dataCar.map(car => {
      if (car._id === _id) return (
        {
          ...car,
          ...obj
        })

      return dataCar[0];
    });
    
    return _id === dataMotorcycle[0]._id ? newDataMotorcycle[0] : newDataCar[0];
  },

  findOneAndDelete: async ({_id}: { _id: string }): Promise<ICar | null> => {
    const findCar = dataCar.find((car) => car._id === _id);
    const findMotorcycle = dataMotorcycle.find((car) => car._id === _id);

    if (!findCar && !findMotorcycle) return null;

    return _id === dataMotorcycle[0]._id ? dataMotorcycle[0] : dataCar[0];
  }
}