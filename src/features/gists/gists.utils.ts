import { Gist } from './gists.types';

export const getMainFileName = (gist: Gist) => {
  const files = Object.keys(gist.files);
  return files.length > 0 ? gist.files[files[0]].filename : 'Untitled';
};

export const getMainFileInfo = (gist: Gist) => {
  const files = Object.keys(gist.files);
  return gist.files[files[0]];
};
