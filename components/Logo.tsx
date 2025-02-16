import { View } from "react-native";
import Svg, { Text, G, LinearGradient, Stop, Defs } from "react-native-svg";
import { useTheme } from "@/contexts/ThemeContext";
import { useFonts, Lexend_700Bold } from "@expo-google-fonts/lexend";

export const Logo = ({ width = 500, height = 100 }) => {
  const { theme } = useTheme();
  const [fontsLoaded] = useFonts({
    Lexend_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ alignItems: "center", marginBottom: 30 }}>
      <Svg width={width} height={height} viewBox="0 0 500 100">
        <Defs>
          <LinearGradient id="receiptGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={theme.colors.primary} stopOpacity="1" />
            <Stop
              offset="1"
              stopColor={theme.colors.primary}
              stopOpacity="0.6"
            />
          </LinearGradient>
          <LinearGradient id="appGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop
              offset="0"
              stopColor={theme.colors.primary}
              stopOpacity="0.8"
            />
            <Stop
              offset="1"
              stopColor={theme.colors.primary}
              stopOpacity="0.4"
            />
          </LinearGradient>
        </Defs>

        {/* Background group for text */}
        <G>
          {/* App Name */}
          <Text
            x="300"
            y="50"
            fontSize="58"
            fontFamily="Lexend_700Bold"
            fontWeight="bold"
            fill="url(#receiptGradient)"
            textAnchor="end"
            letterSpacing="1"
          >
            Receipt
          </Text>

          {/* App Suffix */}
          <Text
            x="410"
            y="50"
            fontSize="58"
            fontFamily="Lexend_700Bold"
            fontWeight="bold"
            fill="url(#appGradient)"
            textAnchor="end"
          >
            App
          </Text>
        </G>
      </Svg>
    </View>
  );
};
