import {
  Box,
  Stack,
  Tooltip,
  IconButton,
  CircularProgress,
  Badge,
} from '@mui/material';
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  ForkRight as ForkIcon,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import {
  useStarGistMutation,
  useUnstarGistMutation,
  useForkGistMutation,
  useCheckIfStarredQuery,
} from '../../../../services/gists/gists';
import { useAppSelector } from '../../../../redux/hooks';
import './gist-actions.syles.scss';

interface GistActionsProps {
  gistId: string;
  forkCount: number;
}

export function GistActions({ gistId, forkCount }: GistActionsProps) {
  const { user } = useAppSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const { data: isStarred } = useCheckIfStarredQuery(gistId, { skip: !user });
  const [starGist, { isLoading: isStarring }] = useStarGistMutation();
  const [unstarGist, { isLoading: isUnStarring }] = useUnstarGistMutation();
  const [forkGist, { isLoading: isForking }] = useForkGistMutation();

  const handleStar = async () => {
    try {
      if (isStarred) {
        await unstarGist(gistId).unwrap();
        enqueueSnackbar('Gist unstarred successfully', { variant: 'success' });
      } else {
        await starGist(gistId).unwrap();
        enqueueSnackbar('Gist starred successfully', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar('Failed to star gist', { variant: 'error' });
    }
  };

  const handleFork = async () => {
    try {
      await forkGist(gistId).unwrap();
      enqueueSnackbar('Gist forked successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to fork gist', { variant: 'error' });
    }
  };

  return (
    <Stack direction="row">
      <Tooltip title={isStarred ? 'Unstar' : 'Star'}>
        {isStarring || isUnStarring ? (
          <CircularProgress size={20} sx={{ alignSelf: 'center' }} />
        ) : (
          <Box>
            <IconButton
              sx={{ padding: 0 }}
              onClick={handleStar}
              disabled={!user}
            >
              {isStarred ? (
                <StarIcon className="star-filled" />
              ) : (
                <StarBorderIcon />
              )}
            </IconButton>
          </Box>
        )}
      </Tooltip>
      <Tooltip title="Fork">
        {isForking ? (
          <CircularProgress size={20} sx={{ alignSelf: 'center' }} />
        ) : (
          <Badge color="primary" badgeContent={forkCount}>
            <IconButton
              sx={{ padding: 0 }}
              onClick={handleFork}
              disabled={!user}
            >
              <ForkIcon />
            </IconButton>
          </Badge>
        )}
      </Tooltip>
    </Stack>
  );
}
