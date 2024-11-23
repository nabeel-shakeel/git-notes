import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
} from '@mui/material';
import { routes } from '../../../../routing';
import { FileContentViewer, GistAuthorInfo } from '../../../../components';
import { GistActions } from '../gist-actions';
import {
  getMainFileName,
  getMainFileInfo,
} from '../../../../services/gists/gists.utils';
import { Gist } from '../../../../services/gists/gists.types';
import './gist-card.styles.scss';

interface GistCardProps {
  gist: Gist;
}

export function GistCard({ gist }: GistCardProps) {
  const navigate = useNavigate();

  const { language, raw_url } = getMainFileInfo(gist);

  const handleNavigateGist = () => {
    navigate(routes.GIST.replace(':id', gist.id));
  };

  return (
    <Card className="gist-preview-card">
      <CardContent className="card-content">
        <CardActionArea className="code-preview" onClick={handleNavigateGist}>
          <Box className="view-file">
            <Typography component="span" variant="body2" color="white">
              View{' '}
            </Typography>
            <Typography
              component="span"
              variant="body2"
              color="white"
              fontWeight={700}
            >
              {getMainFileName(gist)}
            </Typography>
          </Box>
          <FileContentViewer fileUrl={raw_url} language={language} />
        </CardActionArea>
        <Box className="content-wrapper">
          <GistAuthorInfo
            owner={{
              name: gist.owner.login,
              url: gist.owner.avatar_url,
            }}
            fileName={getMainFileName(gist)}
            createdAt={gist.created_at}
            description={gist.description}
          />
          <GistActions gistId={gist.id} forkCount={0} />
        </Box>
      </CardContent>
    </Card>
  );
}
