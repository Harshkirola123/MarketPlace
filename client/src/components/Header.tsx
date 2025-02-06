import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector, useAppDispatch } from "../store/store";
import { logout, selectCurrentuser } from "../store/reducer/authSlicer";
import { motion } from "framer-motion";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import i18n from "../i18"; // Import your i18n config file
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogoutUserMutation } from "../store/reducer/authApiSlicer";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectCurrentuser);
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAuthenticated = !!user;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Language switcher state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logoutUser("").unwrap();
    dispatch(logout());
    toast.success(t("header.messages.logoutSuccess"));
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { text: t("header.menu.home"), path: "/" },
    {
      text: isAuthenticated ? t("header.menu.dashboard") : null,
      path: isAuthenticated ? "/dashboard" : null,
    },
    { text: t("header.menu.about"), path: "/about" },
    { text: t("header.menu.contact"), path: "/contact" },
    {
      text: isAuthenticated
        ? t("header.menu.profile")
        : t("header.menu.signIn"),
      path: isAuthenticated ? "/profile" : "/signin",
    },
  ];
  const filteredMenuItems = menuItems.filter((item) => item.text !== null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {t("header.title")}
            </Typography>

            {/* Language Switcher */}
            <IconButton color="inherit" onClick={handleMenuClick}>
              <LanguageIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <MenuItem onClick={() => handleLanguageChange("en")}>
                English
              </MenuItem>
              <MenuItem onClick={() => handleLanguageChange("es")}>
                Español
              </MenuItem>
              <MenuItem onClick={() => handleLanguageChange("hi")}>
                Hindi
              </MenuItem>
            </Menu>

            {/* Menu Items */}
            {isMobile ? (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <>
                {filteredMenuItems.map((item) => (
                  <Button
                    key={item.path}
                    color="inherit"
                    component={Link}
                    to={item.path}
                  >
                    {item.text}
                  </Button>
                ))}
                {isAuthenticated && (
                  <Button color="inherit" onClick={handleLogout}>
                    {t("header.menu.logout")}
                  </Button>
                )}
              </>
            )}
          </Toolbar>
        </AppBar>
      </motion.div>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          {isAuthenticated && (
            <ListItem onClick={handleLogout}>
              <ListItemText primary={t("header.menu.logout")} />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
