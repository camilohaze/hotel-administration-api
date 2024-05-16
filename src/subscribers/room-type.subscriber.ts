import { Injectable } from '@nestjs/common';

import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';

import { RoomTypeEntity } from '@entities';

/**
 * RoomType subscriber.
 *
 * @export
 * @class RoomTypeSubscriber
 * @implements {EntitySubscriberInterface}
 */
@EventSubscriber()
@Injectable()
export class RoomTypeSubscriber implements EntitySubscriberInterface {
  /**
   * Returns the class of the entity to which events will listen.
   * If this method is omitted, then subscriber will listen to events of all entities.
   *
   * @returns
   * @memberof RoomTypeSubscriber
   */
  listenTo() {
    return RoomTypeEntity;
  }

  afterInsert(event: InsertEvent<RoomTypeEntity>): void {
    // code here !
  }

  /**
   * Called before entity insertion.
   */
  beforeInsert(event: InsertEvent<RoomTypeEntity>): void {
    // code here !
  }
}
