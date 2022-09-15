export class StorageKeys {
  public static API_TOKEN = 'ytt:api:token';
  public static USER_NAME = 'ytt:user:name';
  public static USER_LOGIN = 'ytt:user:login';
  public static USER_LOGGED_IN = 'ytt:user:logged:in';
  public static TIME_TRACKING_ACTIONS = 'ytt:actions';
}

export enum ActionCardModificationType {
  CREATE,
  UPDATE,
  DELETE,
}

export interface ActionCardModificationData {
  type: ActionCardModificationType;
  action: TimeTrackingAction;
}

export interface TimeTrackingAction {
  id: string;
  name: string;
  type: string;
}

export interface TimeTrackingActionExtended {
  id: string;
  name: string;
  type: string;
  isStarted: boolean;
}

export interface ActiveTasksResponse {
  active_tasks: string[];
}

export interface ExportFile {
  apiToken: string;
  actions: string;
}