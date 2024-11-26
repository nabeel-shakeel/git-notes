import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useGetGistContentQuery } from '../../services/gists/gists';
import { LIMITED_FILE_LINES } from '../../utils/constants';

interface FileContentViewerProps {
  language: string;
  fileUrl: string;
  showFullContent?: boolean;
}

export function FileContentViewer({
  language,
  fileUrl,
  showFullContent = false,
}: FileContentViewerProps) {
  const { data: fileContent } = useGetGistContentQuery(fileUrl);

  const limitedContent = showFullContent
    ? fileContent
    : fileContent
        ?.split('\n')
        .slice(0, LIMITED_FILE_LINES)
        .concat(Array(LIMITED_FILE_LINES).fill(''))
        .slice(0, LIMITED_FILE_LINES)
        .join('\n');

  return (
    <SyntaxHighlighter
      style={theme}
      customStyle={{ marginTop: 0, overflowX: 'hidden' }}
      language={language}
      showLineNumbers
      lineNumberContainerStyle={{ paddingRight: '8px' }}
      lineNumberStyle={{ color: '#b7b7b7' }}
    >
      {limitedContent || ''}
    </SyntaxHighlighter>
  );
}
