import { Injectable } from '@nestjs/common';

import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';

import { HotelEntity } from '@entities';

/**
 * Hotel subscriber.
 *
 * @export
 * @class HotelSubscriber
 * @implements {EntitySubscriberInterface}
 */
@EventSubscriber()
@Injectable()
export class HotelSubscriber implements EntitySubscriberInterface {
  /**
   * Returns the class of the entity to which events will listen.
   * If this method is omitted, then subscriber will listen to events of all entities.
   *
   * @returns
   * @memberof HotelSubscriber
   */
  listenTo() {
    return HotelEntity;
  }

  afterInsert(event: InsertEvent<HotelEntity>): void {
    // code here !
  }

  /**
   * Called before entity insertion.
   */
  beforeInsert(event: InsertEvent<HotelEntity>): void {
    // code here !
  }
}
