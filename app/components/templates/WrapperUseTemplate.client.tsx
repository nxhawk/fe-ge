import { useChatHistory } from '~/lib/persistence';
import ButtonUseTemplate from './ButtonUseTemplate';

interface WrapperUseTemplateProps {
  githubUrl: string;
  branch: string;
}

const WrapperUseTemplate = ({ githubUrl, branch }: WrapperUseTemplateProps) => {
  const { ready, importChat } = useChatHistory();

  return <div>{ready && <ButtonUseTemplate githubUrl={githubUrl} importChat={importChat} branch={branch} />}</div>;
};

export default WrapperUseTemplate;
