import { DrugsCategory } from '../drugs-category/models/drugs-category.model';
import { Drug } from '../drugs/models/drug.model';
import { Supplier } from '../suppliers/models/supplier.model';
import { Department, Facility } from './inventory.model';

export const InventoryModels = [
  Drug,
  DrugsCategory,
  Supplier,
  Facility,
  Department,
];
