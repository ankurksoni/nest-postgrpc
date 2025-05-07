import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('AppService', () => {
    let service: AppService;
    let mockHelloService;

    beforeEach(async () => {
      mockHelloService = {
        SayHello: jest.fn()
      };

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AppService,
          {
            provide: 'HelloService',
            useValue: mockHelloService
          }
        ],
      }).compile();

      service = module.get<AppService>(AppService);
      service['helloService'] = mockHelloService;
    });

    describe('getHello', () => {
      it('should return hello message', async () => {
        const name = 'Test';
        const expectedResponse = { message: 'Hello Test' };

        mockHelloService.SayHello.mockReturnValue({
          toPromise: jest.fn().mockResolvedValue(expectedResponse)
        });

        const result = await service.getHello(name);

        expect(mockHelloService.SayHello).toHaveBeenCalledWith({ name });
        expect(result).toBe(expectedResponse.message);
      });

      it('should handle errors', async () => {
        const name = 'Test';
        const error = new Error('Test error');
        mockHelloService.SayHello.mockReturnValue({
          toPromise: jest.fn().mockRejectedValue(error)
        });

        await expect(service.getHello(name)).rejects.toThrow(error);
      });
    });
  });

});
