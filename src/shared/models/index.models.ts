import { UserModels } from '../../user/models';
import { DrugOrderModels } from '../../orders/models';

export const IndexModels = [...UserModels, ...DrugOrderModels];
