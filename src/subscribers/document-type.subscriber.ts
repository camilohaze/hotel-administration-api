import { Injectable } from '@nestjs/common';

import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';

import { DocumentTypeEntity } from '@entities';

/**
 * DocumentType subscriber.
 *
 * @export
 * @class DocumentTypeSubscriber
 * @implements {EntitySubscriberInterface}
 */
@EventSubscriber()
@Injectable()
export class DocumentTypeSubscriber implements EntitySubscriberInterface {
  /**
   * Returns the class of the entity to which events will listen.
   * If this method is omitted, then subscriber will listen to events of all entities.
   *
   * @returns
   * @memberof DocumentTypeSubscriber
   */
  listenTo() {
    return DocumentTypeEntity;
  }

  afterInsert(event: InsertEvent<DocumentTypeEntity>): void {
    // code here !
  }

  /**
   * Called before entity insertion.
   */
  beforeInsert(event: InsertEvent<DocumentTypeEntity>): void {
    // code here !
  }
}
