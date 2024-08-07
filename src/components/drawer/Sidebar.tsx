import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import logoB from "../../assets/icon/logoWithText.svg";
import navItems from "../../constants/navItems";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box sx={{ bgcolor: "white", height: "100vh", px: "16px" }}>
      <Stack height={64} justifyContent="center" alignItems="center">
        <img src={logoB} alt="Logo" />
      </Stack>
      <List>
        {navItems.map((item, index) => (
          <React.Fragment key={index}>
            <NavLink
              key={item.path}
              to={item.path}
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <ListItem
                  disablePadding
                  sx={{
                    bgcolor: isActive ? "primary.main" : "",
                    "& svg": {
                      color: isActive ? "white" : "text.secondary",
                    },
                    "&:hover": {
                      bgcolor: isActive ? "primary.main" : "primary.light",
                      borderRadius: "10px",
                    },
                    borderRadius: "10px",
                    mb: 1,
                  }}
                >
                  <ListItemButton
                    selected={isActive}
                    sx={{ pl: "12px", borderRadius: "10px" }}
                  >
                    <ListItemIcon sx={{ minWidth: "38px" }}>
                      <SvgIcon component={item.icon} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          fontWeight="600"
                          color={isActive ? "white" : "text.secondary"}
                        >
                          {item.title}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              )}
            </NavLink>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
