import axios from 'axios';
import queryString from 'query-string';
import { TextDocumentInterface, TextDocumentGetQueryInterface } from 'interfaces/text-document';
import { GetQueryInterface } from '../../interfaces';

export const getTextDocuments = async (query?: TextDocumentGetQueryInterface) => {
  const response = await axios.get(`/api/text-documents${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTextDocument = async (textDocument: TextDocumentInterface) => {
  const response = await axios.post('/api/text-documents', textDocument);
  return response.data;
};

export const updateTextDocumentById = async (id: string, textDocument: TextDocumentInterface) => {
  const response = await axios.put(`/api/text-documents/${id}`, textDocument);
  return response.data;
};

export const getTextDocumentById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/text-documents/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTextDocumentById = async (id: string) => {
  const response = await axios.delete(`/api/text-documents/${id}`);
  return response.data;
};
