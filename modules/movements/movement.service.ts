import { MovementRepository } from './movement.repository';
import { CreateMovementDTO } from './movement.types';

export class MovementService {
  private repository = new MovementRepository();

  async createMovement(data: CreateMovementDTO) {
    if (data.amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }

    return this.repository.create(data);
  }

  async getAllMovements() {
    return this.repository.findAll();
  }

  async calculateBalance() {
    const movements = await this.repository.findAll();

    return movements.reduce((acc, movement) => {
      const amount = Number(movement.amount);

      if (movement.type === 'INCOME') {
        return acc + amount;
      }

      return acc - amount;
    }, 0);
  }

  async getSummary() {
    const movements = await this.repository.findAll();

    const income = movements
      .filter((m) => m.type === 'INCOME')
      .reduce((acc, m) => acc + Number(m.amount), 0);

    const expense = movements
      .filter((m) => m.type === 'EXPENSE')
      .reduce((acc, m) => acc + Number(m.amount), 0);

    return {
      income,
      expense,
      balance: income - expense,
    };
  }

  async generateCSV() {
  const movements = await this.repository.findAll();

  const headers = ["Concept", "Amount", "Date", "Type"];

  const rows = movements.map(m => [
    m.concept,
    Number(m.amount),
    new Date(m.date).toISOString(),
    m.type
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");

  return csvContent;
}
}
