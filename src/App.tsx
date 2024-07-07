import { ThemeProvider } from '@mui/material';
import Sidebar from './components/sidebar/Sidebar';
import Widget from './components/widget/Widget';
import { theme } from './theme/theme';
import './App.scss';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Sidebar></Sidebar>
        <Widget></Widget>
      </div>
    </ThemeProvider>
  );
}

export default App;
