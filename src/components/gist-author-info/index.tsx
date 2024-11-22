import { Typography, Box, Avatar } from '@mui/material';
import './gist-author-info.styles.scss';

interface GistAuthorInfoProps {
  owner: {
    name: string;
    url: string;
  };
  fileName: string;
  description?: string;
}

export function GistAuthorInfo(props: GistAuthorInfoProps) {
  const { owner, description, fileName } = props;
  return (
    <Box className="author-section">
      <Avatar src={owner.url} alt={owner.name} sx={{ width: 40, height: 40 }} />
      <Box className="author-info">
        <Box className="name-section">
          <Typography variant="body2" color="primary" component="span">
            {owner.name}
          </Typography>
          <Typography variant="body2" component="span" color="primary">
            /
          </Typography>
          <Typography
            variant="body2"
            component="span"
            className="filename"
            color="primary"
          >
            {fileName}
          </Typography>
        </Box>
        {description && (
          <Typography component="p" variant="caption" className="description">
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
