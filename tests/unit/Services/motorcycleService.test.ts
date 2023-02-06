import sinon from 'sinon';
import { Model } from 'mongoose';
import { expect } from 'chai';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Test motorcycle service layer', function () {
  afterEach(sinon.restore);

  it('should create a new motorcycle when receiving expected data', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Honda Cbr 1000rr',
      year: 2011,
      color: 'Orange',
      status: true,
      buyValue: 59.900,
      category: 'Street',
      engineCapacity: 1000,
    };

    const motorcycleResponse = {
      id: '634852326b35b59438fbea31',
      model: 'Honda Cbr 1000rr',
      year: 2011,
      color: 'Orange',
      status: true,
      buyValue: 59.900,
      category: 'Street',
      engineCapacity: 1000,
    };

    const motorcycleOutput: Motorcycle = new Motorcycle(motorcycleResponse);

    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.create(motorcycleInput);
    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('should update a Motorcycle when receiving expected data', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const motorcycleResponse = {
      id: '634852326b35b59438fbea2f',
      model: 'Honda Cb 600f Hornet',
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const motorcycleOutput: Motorcycle = new 
    Motorcycle(motorcycleResponse);

    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.updateById('634852326b35b59438fbea2f', motorcycleInput);
    expect(result).to.be.deep.equal(motorcycleOutput);
  });
});