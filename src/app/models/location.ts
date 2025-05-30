
import { OwnerDetails } from './owner' // Adjust the import path as needed
import { Address } from './address'; // Adjust the import path as needed

export class LocationDomain {

  locationId?: number;
  ownerDetails?: OwnerDetails;
  address?: Address;
  numberOfMachines?: number;
  initialKioskBalance?: number;
  ownerSplitShare?: number;
}
