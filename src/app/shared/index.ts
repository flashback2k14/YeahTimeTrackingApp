import { InjectionToken } from '@angular/core';

export {
  ActionCardModificationData,
  ActionCardModificationType,
  ActiveTasksResponse,
  ExportFile,
  StorageKeys,
  TimeTrackingAction,
  TimeTrackingActionExtended,
} from './models';

export {
  createNewTimeTrackingAction,
  createUuidV4,
  toJson,
  toMap,
} from './utils';

export {
  actionCardModificationComponentModules,
  actionDashboardCardComponentModules,
  actionSettingsCardComponentModules,
  authComponentModules,
  dashboardComponentModules,
  exportDialogComponentModules,
  historyComponentModules,
  importDialogComponentModules,
  rootComponentModules,
  settingComponentModules,
} from './modules';

export const API_BASE_URL: InjectionToken<string> = new InjectionToken<string>(
  'API_BASE_URL'
);