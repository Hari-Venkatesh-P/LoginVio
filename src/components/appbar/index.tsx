// Common Appbar which is diplayed at the TOP of  application
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface CustomAppBarProps {
  title: string;
  showLogOut: boolean;
}
// App Bar component
export default function CustomAppBar(props: CustomAppBarProps) {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #37297e 10%, #ac42c2 90%)",
        }}
      >
        <Box
          sx={{
            minHeight: "4rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box p={2}>
            <Typography variant="h6" component="div">
              {props.title}
            </Typography>
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
}
