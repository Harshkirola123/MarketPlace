import React from "react";
import { Box, Typography, Link, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <Box
      sx={{
        textAlign: "center",
        py: 4,
        backgroundColor: "#1a1a1a", // Dark background for a modern look
        color: "#fff", // White text for better readability
        px: 2, // Padding on the left and right
        borderTop: "2px solid #444", // Add top border for separation
      }}
    >
      <Typography variant="body2" sx={{ mb: 2 }}>
        {t("footer.copyright", { year })}
      </Typography>

      <Box sx={{ display: "inline-flex", gap: 3, mb: 2 }}>
        <Link
          href="/terms"
          underline="hover"
          sx={{
            fontSize: "14px",
            color: "#d1d1d1", // Lighter color for links
            "&:hover": { color: "#fff", textDecoration: "none" },
          }}
        >
          {t("footer.terms")}
        </Link>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "#d1d1d1" }} />
        <Link
          href="/privacy"
          underline="hover"
          sx={{
            fontSize: "14px",
            color: "#d1d1d1", // Lighter color for links
            "&:hover": { color: "#fff", textDecoration: "none" },
          }}
        >
          {t("footer.privacy")}
        </Link>
      </Box>

      <Typography variant="body2" sx={{ fontSize: "12px", color: "#bbb" }}>
        {t("language")}
      </Typography>
    </Box>
  );
};

export default Footer;
