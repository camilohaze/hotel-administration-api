import { Injectable } from '@nestjs/common';

import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';

import { GenderEntity } from '@entities';

/**
 * Gender subscriber.
 *
 * @export
 * @class GenderSubscriber
 * @implements {EntitySubscriberInterface}
 */
@EventSubscriber()
@Injectable()
export class GenderSubscriber implements EntitySubscriberInterface {
  /**
   * Returns the class of the entity to which events will listen.
   * If this method is omitted, then subscriber will listen to events of all entities.
   *
   * @returns
   * @memberof GenderSubscriber
   */
  listenTo() {
    return GenderEntity;
  }

  afterInsert(event: InsertEvent<GenderEntity>): void {
    // code here !
  }

  /**
   * Called before entity insertion.
   */
  beforeInsert(event: InsertEvent<GenderEntity>): void {
    // code here !
  }
}
