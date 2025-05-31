import { LocationDomain } from './location'; // Adjust the import path as needed
import { MachineCollection } from './machine-collection';
import { User } from './user'; // Adjust the import path as needed

export class CashCollection {
  collectionId?: string;
  location?: LocationDomain;
  cashCollectionBy?: User;
  startDate?: Date;
  endDate?: Date;
  totalAmount?: number;
  ownerShareAmount?: number;
  vendorShareAmount?: number;
  cashHandedOverToOwner?: boolean;
  cashHandedOverTo?: string;
}

export class CashCollectionRequest {
  locationId?: Number;
  userName?: String;
  ownerShareAmount?: number;
  vendorShareAmount?: number;
  cashHandedOverToOwner?: boolean;
  cashHandedOverTo?: string;
  machineCollections?: Array<MachineCollection>;
  totalAmount?: number;
}
