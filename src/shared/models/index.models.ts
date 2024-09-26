import { ReportModels } from 'src/reports/models';
import { UserModels } from '../../user/models';
import { DrugOrderModels } from '../../orders/models';

export const IndexModels = [...UserModels, ...ReportModels, ...DrugOrderModels];
