import { MovementService } from '@/modules/movements/movement.service';

describe('MovementService - calculateBalance', () => {
  it('should calculate balance correctly', async () => {
    const service = new MovementService();

    const mockMovements = [
      { amount: 1000, type: 'INCOME' },
      { amount: 200, type: 'EXPENSE' },
    ] as any;

    jest
      .spyOn(service['repository'], 'findAll')
      .mockResolvedValue(mockMovements);

    const balance = await service.calculateBalance();

    expect(balance).toBe(800);
  });
});
