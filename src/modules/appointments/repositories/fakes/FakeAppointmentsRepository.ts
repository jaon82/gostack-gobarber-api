import { v4 as uuid } from 'uuid';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../IAppointmentsRepository';

export default class FakeAppointmentsRepository
  implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => appointment.date === date,
    );

    return findAppointment;
  }

  public async create({
    providerId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, providerId });

    this.appointments.push(appointment);

    return appointment;
  }
}