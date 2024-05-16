import { Injectable } from '@nestjs/common';

import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';

import { RoomEntity } from '@entities';

/**
 * Room subscriber.
 *
 * @export
 * @class RoomSubscriber
 * @implements {EntitySubscriberInterface}
 */
@EventSubscriber()
@Injectable()
export class RoomSubscriber implements EntitySubscriberInterface {
  /**
   * Returns the class of the entity to which events will listen.
   * If this method is omitted, then subscriber will listen to events of all entities.
   *
   * @returns
   * @memberof RoomSubscriber
   */
  listenTo() {
    return RoomEntity;
  }

  afterInsert(event: InsertEvent<RoomEntity>): void {
    // code here !
  }

  /**
   * Called before entity insertion.
   */
  beforeInsert(event: InsertEvent<RoomEntity>): void {
    // code here !
  }
}
