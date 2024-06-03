import logo from './logo.svg';
import './App.css';
import { createTheme, ThemeProvider } from "@mui/material/styles"

// MATERIAL UI
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';

const theme = createTheme({
  typography: {
    fontFamily: ["IBM-Regular"],
  }
})
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" style={{}}>

          {/* CONTENT CONTAINER */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}>
            {/* CARD */}
            <div
              dir="rtl"
              style={{
                width: "100%",
                background: "rgb(28 52 91 / 36%",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0, 0, 0, 0.05)",
              }}>

              {/*CONTENT */}
              <div >

                {/* CITY & TIME */}
                <div
                  style={{ display: "flex", alignItems: "end", justifyContent: "start" }}
                  dir="rtl">
                  <Typography variant="h3" style={{ marginRight: "20px" }}>
                    الرياض
                  </Typography>

                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    الأحد 2024-2-23
                  </Typography>
                </div>
                {/* === CITY & TIME === */}

                <hr />

                {/* CONTAINER OF DEGREE &CLOUD ICON */}
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                  {/* DEGREE &  DESCRIPTION*/}
                  <div>
                    {/* TEMP */}
                    <div>
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        28
                      </Typography>

                      {/*TODO: TEMP IMAGE  */}
                    </div>
                    {/*=== TEMP ===*/}

                    <Typography variant="h6" style={{}}>
                      broken clouds
                    </Typography>

                    {/* MIN & MAX*/}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h5 >الصغرى: 45 </h5>
                      <h5 style={{ margin: "0px 5px" }}> | </h5>
                      <h5>الكبرى: 45 </h5>
                    </div>
                    {/*== MIN & MAX ==*/}
                  </div>
                  {/* === DEGREE &  DESCRIPTION ===*/}

                  <CloudIcon style={{ fontSize: "200px", color: "white", }} />
                </div>
                {/*=== CONTAINER OF DEGREE &CLOUD ICON ===*/}

              </div>
              {/* === CONTENT === */}

            </div>
            {/* === CARD === */}

            {/* TRANSLATION CONTAINER */}
            <div dir="rtl" style={{ display: "flex", justifyContent: "end", width: "100%" , marginTop:"20px"}}>
              <Button style={{ color: "white" }} variant="text">إنجليزي</Button>
            </div>
            {/* TRANSLATION CONTAINER */}

          </div>
          {/* === CONTENT CONTAINER === */}

        </Container>

      </ThemeProvider>
    </div>
  );
}

export default App;
