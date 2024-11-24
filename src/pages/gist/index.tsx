import { useParams } from 'react-router-dom';
import {
  GistListLoading,
  ErrorComponent,
  NoGistAvailable,
} from '../../components';
import { useGetSingleGistQuery } from '../../services/gists/gists';
import { GistDetails } from '../../features/public-gists/components/gist-details';

export function GistPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <ErrorComponent />;
  }

  const { data, isLoading, error } = useGetSingleGistQuery(id);

  if (isLoading) return <GistListLoading />;
  if (error) return <ErrorComponent />;

  if (!data) {
    return <NoGistAvailable />;
  }

  return <GistDetails gist={data} />;
}
