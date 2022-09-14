export interface Modified {
  id: string;
  type: string;
  last_edited_time: Date;
}

export interface Created {
  id: string;
  type: string;
  created_time: Date;
}

export interface Comment {
  id: string;
  type: string;
  rich_text: RichText[];
}

export interface Select {
  id: string;
  name: string;
  color: string;
}

export interface State {
  id: string;
  type: string;
  select: Select;
}

export interface Formula {
  type: string;
  number: number;
}

export interface Duration {
  id: string;
  type: string;
  formula: Formula;
}

export interface Text {
  content: string;
  link?: any;
}

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface RichText {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href?: any;
}

export interface Type {
  id: string;
  type: string;
  rich_text: RichText[];
}

export interface Text2 {
  content: string;
  link?: any;
}

export interface Annotations2 {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface Title {
  type: string;
  text: Text2;
  annotations: Annotations2;
  plain_text: string;
  href?: any;
}

export interface ID {
  id: string;
  type: string;
  title: Title[];
}

export interface Properties {
  Modified: Modified;
  Created: Created;
  Comment: Comment;
  State: State;
  Duration: Duration;
  Type: Type;
  ID: ID;
}

export interface Parent {
  type: string;
  database_id: string;
}

export interface HistoryTask {
  properties: Properties;
  parent: Parent;
}

export interface HistoryResponse {
  historyTasks: HistoryTask[];
}

export class HistoryItem {
  public parentDbId: string = '';
  public modified: Date = {} as Date;
  public created: Date = {} as Date;
  public comment: string = '';
  public duration: number = 0;
  public state: Select = {} as Select;
  public type: string = '';
  public id: string = '';

  public static create(item: HistoryTask): HistoryItem {
    const flatted = {
      parentDbId: item.parent.database_id,
      modified: item.properties.Modified.last_edited_time,
      created: item.properties.Created.created_time,
      comment: item.properties.Comment.rich_text[0]?.plain_text ?? 'no comment',
      state: item.properties.State.select,
      duration: item.properties.Duration.formula.number,
      type: item.properties.Type.rich_text[0]?.plain_text ?? 'no type',
      id: item.properties.ID.title[0]?.plain_text ?? 'no id',
    } as HistoryItem;

    return flatted;
  }
}