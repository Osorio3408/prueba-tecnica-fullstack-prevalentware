import { MovementService } from '@/modules/movements/movement.service';

describe('MovementService - getSummary', () => {
  it('should return correct summary', async () => {
    const service = new MovementService();

    const mockMovements = [
      { amount: 1000, type: 'INCOME' },
      { amount: 200, type: 'EXPENSE' },
    ] as any;

    jest
      .spyOn(service['repository'], 'findAll')
      .mockResolvedValue(mockMovements);

    const summary = await service.getSummary();

    expect(summary).toEqual({
      income: 1000,
      expense: 200,
      balance: 800,
    });
  });
});
