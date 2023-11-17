import { bio } from "./style/bio";
import BioSnippetContent2 from "./components/bioSnippetContent2";
import BioSnippetContent1 from "./components/bioSnippetContent1";

const BioSnippet = () => {
  return (
    <div style={bio}>
      <BioSnippetContent1 />
      <BioSnippetContent2 />
    </div>
  );
};

export default BioSnippet;
