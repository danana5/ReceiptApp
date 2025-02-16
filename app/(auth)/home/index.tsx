import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { BottomNavBar } from "@/components/BottomNavBar";
import { useTheme } from "@/contexts/ThemeContext";
import { Card } from "react-native-paper";
import { BarChart, PieChart } from "react-native-chart-kit";
import { router } from "expo-router";
import { ProfilePicture } from "@/components/ProfilePicture";

export default function HomePage() {
  const { userDetails } = useAuth();
  const { theme } = useTheme();

  // Sample data for the bar chart - replace with your actual data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [1200, 1800, 1400, 2000, 1600, 2400],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: theme.colors.background.primary,
    backgroundGradientFrom: theme.colors.background.primary,
    backgroundGradientTo: theme.colors.background.primary,
    color: (opacity = 1) => `rgba(${theme.colors.primaryRGB}, ${opacity})`,
    labelColor: () => theme.colors.text.primary,
    barPercentage: 0.7,
    decimalPlaces: 0,
    propsForLabels: {
      fontSize: 12,
      fontWeight: "bold",
    },
  };

  // Add this new data for the pie chart
  const spendingData = [
    {
      name: "Snacks",
      spending: 400,
      color: "#FF6384",
      legendFontColor: theme.colors.text.primary,
    },
    {
      name: "Drinks",
      spending: 300,
      color: "#36A2EB",
      legendFontColor: theme.colors.text.primary,
    },
    {
      name: "Meats/Proteins",
      spending: 200,
      color: "#FFCE56",
      legendFontColor: theme.colors.text.primary,
    },
    {
      name: "Fruits/Vegetables",
      spending: 150,
      color: "#4BC0C0",
      legendFontColor: theme.colors.text.primary,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.secondary,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.text.primary,
    },
    card: {
      marginBottom: 20,
      backgroundColor: theme.colors.background.primary,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.text.primary,
    },
    chartContainer: {
      alignItems: "center",
      marginTop: 10,
    },
    legendContainer: {
      marginTop: 10,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    viewMore: {
      color: theme.colors.primary,
      fontSize: 14,
      marginLeft: 8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            Welcome {userDetails?.firstName}!
          </Text>
          <ProfilePicture onPress={() => router.push("/(auth)/profile")} />
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Monthly Expenses</Text>
            <View style={styles.chartContainer}>
              <BarChart
                data={chartData}
                width={Dimensions.get("window").width - 60}
                height={220}
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                fromZero
                yAxisLabel="$"
                yAxisSuffix=""
                style={{
                  borderRadius: 16,
                }}
              />
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Spending Insights</Text>
              <Pressable onPress={() => router.push("/insights")}>
                <Text style={styles.viewMore}>View more</Text>
              </Pressable>
            </View>
            <View style={styles.chartContainer}>
              <PieChart
                data={spendingData}
                width={Dimensions.get("window").width - 60}
                height={220}
                chartConfig={chartConfig}
                accessor="spending"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </View>
          </Card.Content>
        </Card>
      </View>

      <BottomNavBar />
    </View>
  );
}
