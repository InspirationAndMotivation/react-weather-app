import { ThemeProvider } from '@mui/material';
import Sidebar from './components/sidebar/Sidebar';
import Widget from './components/widget/Widget';
import { theme } from './theme/theme';
import './App.scss';
import RightBar from './components/rightBar/RightBar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Sidebar></Sidebar>
        <Widget></Widget>
        <RightBar></RightBar>
      </div>
    </ThemeProvider>
  );
}

export default App;
