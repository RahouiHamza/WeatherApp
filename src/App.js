import "./App.css";
import CardWeather from "./Components/CardWather"
import { ThemeProvider, createTheme } from "@mui/material";


const theme = createTheme({
  typography: {
    fontFamily: "Cairo",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CardWeather/>
      </ThemeProvider>
    </div>
  );
}

export default App;
