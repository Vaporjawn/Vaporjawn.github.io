import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Alert,
  AlertTitle,
  LinearProgress,
} from "@mui/material";
import {
  TrendingUp,
  Visibility,
  Schedule,
  TouchApp,
  People,
  Language,
  AccountTree,
  Assignment,
} from "@mui/icons-material";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import SEO from "../../components/SEO/SEO";

// Types
interface MetricCard {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactElement;
  color: string;
}

interface ChartData {
  name: string;
  value?: number;
  [key: string]: string | number | undefined;
}

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>("7days");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [timeRange]);

  // Mock data - In production, fetch from Google Analytics API
  const metrics: MetricCard[] = [
    {
      title: "Page Views",
      value: "12,543",
      change: "+15.3%",
      icon: <Visibility />,
      color: "#6366f1",
    },
    {
      title: "Unique Visitors",
      value: "3,892",
      change: "+8.7%",
      icon: <People />,
      color: "#10b981",
    },
    {
      title: "Avg. Session Duration",
      value: "3m 42s",
      change: "+12.1%",
      icon: <Schedule />,
      color: "#f59e0b",
    },
    {
      title: "Bounce Rate",
      value: "42.3%",
      change: "-5.2%",
      icon: <TrendingUp />,
      color: "#ef4444",
    },
    {
      title: "Contact Form Submissions",
      value: "87",
      change: "+23.4%",
      icon: <Assignment />,
      color: "#8b5cf6",
    },
    {
      title: "Project Views",
      value: "2,341",
      change: "+18.9%",
      icon: <AccountTree />,
      color: "#06b6d4",
    },
    {
      title: "Social Clicks",
      value: "456",
      change: "+7.3%",
      icon: <TouchApp />,
      color: "#ec4899",
    },
    {
      title: "Blog Reads",
      value: "1,234",
      change: "+31.2%",
      icon: <Language />,
      color: "#14b8a6",
    },
  ];

  // Page views over time
  const pageViewsData: ChartData[] = [
    { name: "Mon", views: 1200, visitors: 400 },
    { name: "Tue", views: 1800, visitors: 600 },
    { name: "Wed", views: 1600, visitors: 520 },
    { name: "Thu", views: 2100, visitors: 700 },
    { name: "Fri", views: 1900, visitors: 640 },
    { name: "Sat", views: 1400, visitors: 480 },
    { name: "Sun", views: 1543, visitors: 552 },
  ];

  // Top pages
  const topPagesData: ChartData[] = [
    { name: "Home", value: 4523 },
    { name: "Projects", value: 3241 },
    { name: "Blog", value: 2134 },
    { name: "About", value: 1876 },
    { name: "Contact", value: 1234 },
  ];

  // Traffic sources
  const trafficSourcesData: ChartData[] = [
    { name: "Direct", value: 35 },
    { name: "Organic Search", value: 42 },
    { name: "Social Media", value: 15 },
    { name: "Referral", value: 8 },
  ];

  // Device breakdown
  const deviceData: ChartData[] = [
    { name: "Desktop", value: 58 },
    { name: "Mobile", value: 32 },
    { name: "Tablet", value: 10 },
  ];

  const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

  return (
    <>
      <SEO
        title="Analytics Dashboard"
        description="Real-time analytics and insights for Victor Williams portfolio"
        url="https://www.vaporjawn.dev/analytics"
      />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Analytics Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Real-time insights into portfolio performance and user engagement
          </Typography>

          {/* Time Range Selector */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="24hours">Last 24 Hours</MenuItem>
                <MenuItem value="7days">Last 7 Days</MenuItem>
                <MenuItem value="30days">Last 30 Days</MenuItem>
                <MenuItem value="90days">Last 90 Days</MenuItem>
                <MenuItem value="1year">Last Year</MenuItem>
              </Select>
            </FormControl>

            <Chip label="Live Data" color="success" size="small" />
            <Chip label="Auto-refresh: ON" variant="outlined" size="small" />
          </Box>
        </Box>

        {/* Setup Alert */}
        <Alert severity="info" sx={{ mb: 4 }}>
          <AlertTitle>Setup Required</AlertTitle>
          This dashboard displays mock data. To view real analytics:
          <ul style={{ margin: "8px 0" }}>
            <li>Configure Google Analytics 4 Measurement ID in environment variables</li>
            <li>Set up Google Analytics Reporting API credentials</li>
            <li>Enable Hotjar for heatmaps and session recordings</li>
            <li>Refer to <code>docs/analytics-setup.md</code> for detailed instructions</li>
          </ul>
        </Alert>

        {loading && <LinearProgress sx={{ mb: 2 }} />}

        {/* Key Metrics Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  border: 1,
                  borderColor: "divider",
                  transition: "all 0.3s",
                  "&:hover": {
                    borderColor: metric.color,
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: `${metric.color}20`,
                        color: metric.color,
                        mr: 2,
                      }}
                    >
                      {metric.icon}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {metric.title}
                    </Typography>
                  </Box>
                  <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
                    {metric.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: metric.change.startsWith("+") ? "success.main" : "error.main",
                      fontWeight: 600,
                    }}
                  >
                    {metric.change} vs last period
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts Grid */}
        <Grid container spacing={3}>
          {/* Page Views Over Time */}
          <Grid item xs={12} lg={8}>
            <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: "divider", height: "100%" }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Page Views & Visitors
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Daily traffic trends over the selected period
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={pageViewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} name="Page Views" />
                  <Line type="monotone" dataKey="visitors" stroke="#10b981" strokeWidth={2} name="Unique Visitors" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Traffic Sources */}
          <Grid item xs={12} lg={4}>
            <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: "divider", height: "100%" }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Traffic Sources
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Where your visitors come from
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trafficSourcesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {trafficSourcesData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Top Pages */}
          <Grid item xs={12} lg={6}>
            <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: "divider", height: "100%" }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Top Pages
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Most visited pages on your portfolio
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topPagesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" name="Page Views" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Device Breakdown */}
          <Grid item xs={12} lg={6}>
            <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: "divider", height: "100%" }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Device Breakdown
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Devices used to access your portfolio
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button variant="contained" href="https://analytics.google.com" target="_blank">
            Open Google Analytics
          </Button>
          <Button variant="contained" href="https://insights.hotjar.com" target="_blank">
            Open Hotjar Dashboard
          </Button>
          <Button variant="outlined" href="https://search.google.com/search-console" target="_blank">
            Open Search Console
          </Button>
          <Button variant="outlined" onClick={() => window.location.reload()}>
            Refresh Data
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default AnalyticsDashboard;
