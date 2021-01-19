import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date();

    await createAppointmentService.execute({
      date: appointmentDate,
      providerId: '123123',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        providerId: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
