// Common component which represents the card diplayed in dashboard
import * as React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import OfflineBoltSharpIcon from "@mui/icons-material/OfflineBoltSharp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const avatarStyle = { backgroundColor: "#ac42c2" };

export interface DashbaordCardProps {
  label: string;
  value: string;
  referralLink?: string;
}

export default function DashboardCard(props: DashbaordCardProps) {
  const renderIcon = React.useCallback(() => {
    return (
      <React.Fragment>
        {props.label == "Rewards" && <MonetizationOnIcon />}
        {props.label == "Next Goal" && <OfflineBoltSharpIcon />}
        {props.label == "Referral Code" && <StickyNote2Icon />}
      </React.Fragment>
    );
  }, []);

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        width: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="subtitle2"
            component="div"
            style={{ color: "grey" }}
          >
            {props.label}
          </Typography>

          {props.label.includes("Referral Code") ? (
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  style={{ color: "#000000" }}
                  ml={1}
                  mr={1}
                >
                  {props.value}
                </Typography>
                <ContentCopyIcon />
                <Link
                  underline="always"
                  onClick={() => {
                    console.log(props.referralLink)
                    props.referralLink && window.open(props.referralLink);
                  }}
                  ml={1}
                  mr={1}
                  style={{
                    cursor: "pointer",
                    color: "#37297e",
                    marginBottom: "0.25rem",
                  }}
                >
                  {"Share Link"}
                </Link>
              </Box>
            </React.Fragment>
          ) : (
            <Typography
              variant="h6"
              component="div"
              style={{ color: "#000000" }}
            >
              {props.value}
            </Typography>
          )}
        </Box>
        <Box>
          <Avatar style={avatarStyle}>{renderIcon()}</Avatar>
        </Box>
      </Box>
    </Paper>
  );
}
