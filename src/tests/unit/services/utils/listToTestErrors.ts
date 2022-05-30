export const carTest = {
  modelCharacterMin: {
    model: "U",
    year: 1963,
    color: "blue",
    buyValue: 3500,
    seatsQty: 2,
    doorsQty: 2
  },
  yearMin: {
    model: "Uno",
    year: 1888,
    color: "blue",
    buyValue: 3500,
    seatsQty: 2,
    doorsQty: 2
  },
  yearMax:  {
    model: "Uno",
    year: 3000,
    color: "blue",
    buyValue: 3500,
    seatsQty: 2,
    doorsQty: 2
  },
  colorCharacterMin: {
    model: "Uno",
    year: 2000,
    color: "b",
    buyValue: 3500,
    seatsQty: 2,
    doorsQty: 2
  },
  buyValueNotInt: {
    model: "Uno",
    year: 2000,
    color: "blue",
    buyValue: 3499.90,
    seatsQty: 2,
    doorsQty: 2
  },
  doorsMin: {
    model: "Uno",
    year: 2000,
    color: "blue",
    buyValue: 30000,
    seatsQty: 2,
    doorsQty: 1
  },
  doorsMax: {
    model: "Uno",
    year: 2000,
    color: "blue",
    buyValue: 30000,
    seatsQty: 2,
    doorsQty: 5
  },
  seatsMin:{
    model: "Uno",
    year: 2000,
    color: "blue",
    buyValue: 30000,
    seatsQty: 1,
    doorsQty: 4
  },
  seatsMax:{
    model: "Uno",
    year: 2000,
    color: "blue",
    buyValue: 30000,
    seatsQty: 8,
    doorsQty: 4
  },
}

enum MotorcycleCategory {
  Custom = "Custom",
  Street = "Street",
  Trail = "Trail"
}

export const motorcycleTest = {
  modelCharacterMin: {
    model: "U",
    year: 1963,
    color: "blue",
    buyValue: 3500,
    category: MotorcycleCategory.Custom,
    engineCapacity: 2
  },
  yearMin: {
    model: "Honda CG Titan 125",
    year: 1888,
    color: "blue",
    buyValue: 3500,
    category: MotorcycleCategory.Custom,
    engineCapacity: 2
  },
  yearMax:  {
    model: "Honda CG Titan 125",
    year: 3000,
    color: "blue",
    buyValue: 3500,
    category: MotorcycleCategory.Custom,
    engineCapacity: 2
  },
  colorCharacterMin: {
    model: "Honda CG Titan 125",
    year: 2000,
    color: "b",
    buyValue: 3500,
    category: MotorcycleCategory.Custom,
    engineCapacity: 2
  },
  buyValueNotInt: {
    model: "Honda CG Titan 125",
    year: 2000,
    color: "blue",
    buyValue: 3499.90,
    category: MotorcycleCategory.Custom,
    engineCapacity: 2
  },
  engineCapacityMin: {
    model: "Honda CG Titan 125",
    year: 2000,
    color: "blue",
    buyValue: 30000,
    category: MotorcycleCategory.Custom,
    engineCapacity: 0
  },
  engineCapacityMax: {
    model: "Honda CG Titan 125",
    year: 2000,
    color: "blue",
    buyValue: 30000,
    category: MotorcycleCategory.Custom,
    engineCapacity: 2501
  },
}