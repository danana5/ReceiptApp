export const defaultTheme = {
  colors: {
    primary: "#8863FF",
    text: {
      primary: "#333",
      secondary: "#666",
    },
    background: {
      primary: "#fff",
      secondary: "#f5f5f5",
    },
    border: "#e0e0e0",
    error: "#FF0000",
  },
} as const;

export const darkTheme = {
  colors: {
    primary: "#8863FF",
    text: {
      primary: "#fff",
      secondary: "#666",
    },
    background: {
      primary: "#333",
      secondary: "#444",
    },
    border: "#666",
    error: "#FF0000",
  },
} as const;
