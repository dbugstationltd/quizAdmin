import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import logoB from "../../assets/icon/logoWithText.svg";
import navItems from "../../constants/navItems";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const { pathname } = useLocation();

  const handleClick = (index: number | null) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const getPathIndex = (pathname: string) => {
    switch (true) {
      case pathname.startsWith("/content-management"):
        return 2;
      case pathname.startsWith("/push-notification"):
        return 3;
      case pathname.startsWith("/analytics-reports"):
        return 5;
      case pathname.startsWith("/feedback-support"):
        return 6;
      default:
        return null;
    }
  };

  useEffect(() => {
    const index = getPathIndex(pathname);
    setOpenSubmenu(index);
  }, [pathname]);

  return (
    <Box sx={{ bgcolor: "white", height: "100vh", px: "16px" }}>
      <Stack height={64} justifyContent="center" alignItems="center">
        <img src={logoB} alt="Logo" />
      </Stack>
      <List>
        {navItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.subItems ? (
              <>
                <ListItem
                  disablePadding
                  sx={{
                    bgcolor: openSubmenu === index ? "primary.main" : "",
                    "& svg": {
                      color: openSubmenu === index ? "white" : "text.secondary",
                    },
                    "&:hover": {
                      bgcolor:
                        openSubmenu === index
                          ? "primary.main"
                          : "primary.light",
                    },
                    borderRadius: "10px",
                    mb: 1,
                  }}
                >
                  <ListItemButton
                    onClick={() => handleClick(index)}
                    sx={{
                      pl: "12px",
                      borderRadius: "10px",
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "38px" }}>
                      <SvgIcon component={item.icon} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          fontWeight="600"
                          color={
                            openSubmenu === index ? "white" : "text.secondary"
                          }
                        >
                          {item.title}
                        </Typography>
                      }
                    />
                    {openSubmenu === index ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse
                  in={openSubmenu === index}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        style={{ textDecoration: "none" }}
                      >
                        {({ isActive }) => (
                          <ListItem
                            disablePadding
                            sx={{
                              "& svg": {
                                color: isActive
                                  ? "primary.main"
                                  : "text.secondary",
                              },
                              "&:hover": {
                                bgcolor: isActive
                                  ? "primary.light"
                                  : "primary.light",
                                borderRadius: "10px",
                              },
                              mb: 1,
                            }}
                          >
                            <ListItemButton sx={{ pl: 4 }}>
                              <ListItemIcon sx={{ minWidth: "38px" }}>
                                <SvgIcon component={subItem.icon} />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography
                                    fontWeight="600"
                                    color={
                                      isActive
                                        ? "primary.main"
                                        : "text.secondary"
                                    }
                                  >
                                    {subItem.title}
                                  </Typography>
                                }
                              />
                            </ListItemButton>
                          </ListItem>
                        )}
                      </NavLink>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
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
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
