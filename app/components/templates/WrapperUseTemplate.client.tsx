import { useChatHistory } from '~/lib/persistence';
import ButtonUseTemplate from './ButtonUseTemplate';

interface WrapperUseTemplateProps {
  githubUrl: string;
}

const WrapperUseTemplate = ({ githubUrl }: WrapperUseTemplateProps) => {
  const { ready, importChat } = useChatHistory();

  return <div>{ready && <ButtonUseTemplate githubUrl={githubUrl} importChat={importChat} />}</div>;
};

export default WrapperUseTemplate;
