import { Injectable } from '@nestjs/common';

import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';

import { GuestEntity } from '@entities';

/**
 * Guest subscriber.
 *
 * @export
 * @class GuestSubscriber
 * @implements {EntitySubscriberInterface}
 */
@EventSubscriber()
@Injectable()
export class GuestSubscriber implements EntitySubscriberInterface {
  /**
   * Returns the class of the entity to which events will listen.
   * If this method is omitted, then subscriber will listen to events of all entities.
   *
   * @returns
   * @memberof GuestSubscriber
   */
  listenTo() {
    return GuestEntity;
  }

  afterInsert(event: InsertEvent<GuestEntity>): void {
    // code here !
  }

  /**
   * Called before entity insertion.
   */
  beforeInsert(event: InsertEvent<GuestEntity>): void {
    // code here !
  }
}
