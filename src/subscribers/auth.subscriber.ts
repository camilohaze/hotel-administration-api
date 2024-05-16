import { Injectable } from '@nestjs/common';

import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';

import { AuthEntity } from '@entities';

/**
 * Auth subscriber.
 *
 * @export
 * @class AuthSubscriber
 * @implements {EntitySubscriberInterface}
 */
@EventSubscriber()
@Injectable()
export class AuthSubscriber implements EntitySubscriberInterface {
  /**
   * Returns the class of the entity to which events will listen.
   * If this method is omitted, then subscriber will listen to events of all entities.
   *
   * @returns
   * @memberof AuthSubscriber
   */
  listenTo() {
    return AuthEntity;
  }

  afterInsert(event: InsertEvent<AuthEntity>): void {
    // code here !
  }

  /**
   * Called before entity insertion.
   */
  beforeInsert(event: InsertEvent<AuthEntity>): void {
    // code here !
  }
}
