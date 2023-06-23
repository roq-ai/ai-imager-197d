import { TextDocumentInterface } from 'interfaces/text-document';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface VideoInterface {
  id?: string;
  file_path: string;
  text_document_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  text_document?: TextDocumentInterface;
  user?: UserInterface;
  _count?: {};
}

export interface VideoGetQueryInterface extends GetQueryInterface {
  id?: string;
  file_path?: string;
  text_document_id?: string;
  user_id?: string;
}
