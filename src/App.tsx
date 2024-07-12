import { ThemeProvider } from '@mui/material';
import Sidebar from './components/sidebar/Sidebar';
import Widget from './components/widget/Widget';
import { theme } from './theme/theme';
import './App.scss';
import RightBar from './components/rightBar/RightBar';
import Footer from './components/footer/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Sidebar></Sidebar>
        <Widget></Widget>
        <RightBar></RightBar>
      </div>
      <Footer></Footer>
    </ThemeProvider>
  );
}

export default App;
