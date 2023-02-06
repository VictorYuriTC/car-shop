export default interface IMotorcycle {
  _id?: string;
  id?: string;
  model: string;
  year: number;
  color: string;
  status?: boolean;
  buyValue: number;
  category: string;
  engineCapacity: number;
}