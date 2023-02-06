import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/Motorcycle';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (!motorcycle) return null;

    return new Motorcycle(motorcycle);
  }

  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAll() {
    const motorcycleODM = new MotorcycleODM();
    const allmotorcycles = await motorcycleODM.getAll();
    return allmotorcycles;
  }

  public async getById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const foundmotorcycle = await motorcycleODM.getById(id);
    return foundmotorcycle;
  }

  public async updateById(id: string, motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const updatedmotorcycle = await motorcycleODM.updateById(id, motorcycle);
    return updatedmotorcycle;
  }
}

export default MotorcycleService;
