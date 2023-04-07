import {createRealmContext} from '@realm/react';
import { Transaction } from './Models/Transaction';

// Create a configuration object
const realmConfig = {
  schema: [Transaction],
  schemaVersion: 1
};

export const SyncedRealmContext = createRealmContext(realmConfig);