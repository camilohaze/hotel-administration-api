import { Injectable } from '@nestjs/common';

import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';

import { CityEntity } from '@entities';

/**
 * City subscriber.
 *
 * @export
 * @class CitySubscriber
 * @implements {EntitySubscriberInterface}
 */
@EventSubscriber()
@Injectable()
export class CitySubscriber implements EntitySubscriberInterface {
  /**
   * Returns the class of the entity to which events will listen.
   * If this method is omitted, then subscriber will listen to events of all entities.
   *
   * @returns
   * @memberof CitySubscriber
   */
  listenTo() {
    return CityEntity;
  }

  afterInsert(event: InsertEvent<CityEntity>): void {
    // code here !
  }

  /**
   * Called before entity insertion.
   */
  beforeInsert(event: InsertEvent<CityEntity>): void {
    // code here !
  }
}
