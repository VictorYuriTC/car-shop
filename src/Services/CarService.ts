import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/Car';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (!car) return null;

    return new Car(car);
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAll() {
    const carODM = new CarODM();
    const allCars = await carODM.getAll();
    return allCars;
  }

  public async getById(id: string) {
    const carODM = new CarODM();
    const foundCar = await carODM.getById(id);
    return foundCar;
  }
}

export default CarService;