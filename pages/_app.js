import "../styles/styles.css";
import 'notyf/notyf.min.css';
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";

import NoSSR from '../components/utils/NoSSR';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <NoSSR>
        <Component {...pageProps} />
      </NoSSR>
    </>
  );
};

export default App;
