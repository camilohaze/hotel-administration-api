import { Injectable } from '@nestjs/common';

import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';

import { BookingEntity } from '@entities';

/**
 * Booking subscriber.
 *
 * @export
 * @class BookingSubscriber
 * @implements {EntitySubscriberInterface}
 */
@EventSubscriber()
@Injectable()
export class BookingSubscriber implements EntitySubscriberInterface {
  /**
   * Returns the class of the entity to which events will listen.
   * If this method is omitted, then subscriber will listen to events of all entities.
   *
   * @returns
   * @memberof BookingSubscriber
   */
  listenTo() {
    return BookingEntity;
  }

  afterInsert(event: InsertEvent<BookingEntity>): void {
    // code here !
  }

  /**
   * Called before entity insertion.
   */
  beforeInsert(event: InsertEvent<BookingEntity>): void {
    // code here !
  }
}
