/**
 * Admin Dashboard Page
 * Protected analytics and administration dashboard
 * @module pages/admin/AdminDashboard
 */

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
  CircularProgress,
  Skeleton,
  Tabs,
  Tab,
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
  Refresh,
  BarChart as BarChartIcon,
  EditNote,
} from "@mui/icons-material";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";
import SEO from "../../components/SEO/SEO";
import { fetchDashboardMetrics, type DashboardMetrics } from "../../services/analytics";
import { TabPanel, a11yProps } from "./components/TabPanel";
import { BlogPostsList } from "./components/BlogPostsList";

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

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [timeRange, setTimeRange] = useState<string>("30");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Fetch dashboard data
  const loadDashboardData = async (days: number) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`[AdminDashboard] Fetching metrics for last ${days} days...`);
      const data = await fetchDashboardMetrics(days);
      setMetrics(data);
      setLastUpdated(new Date());
      console.log("[AdminDashboard] Metrics loaded successfully:", data);
    } catch (err) {
      let errorMessage = err instanceof Error ? err.message : "Failed to load dashboard data";

      console.log('[AdminDashboard] Original error message:', errorMessage);

      // Provide user-friendly guidance for Firebase initialization errors
      if (errorMessage.includes("Firestore not initialized") || errorMessage.includes("Firebase configuration incomplete")) {
        console.log('[AdminDashboard] Transforming Firebase error to user-friendly message');
        errorMessage = "Firebase is not configured. Please add your Firebase credentials to the .env file. See FIREBASE_QUICKSTART.md for setup instructions.";
      }

      console.error("[AdminDashboard] Error loading metrics:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData(parseInt(timeRange));
  }, [timeRange]);

  // Manual refresh
  const handleRefresh = () => {
    loadDashboardData(parseInt(timeRange));
  };

  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  // Format duration from minutes to readable string
  const formatDuration = (minutes: number): string => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}m ${secs}s`;
  };

  // Calculate change percentage (placeholder - would need historical data)
  const calculateChange = (): string => {
    return "N/A"; // Would require comparing to previous period
  };

  // Build metrics cards from real data
  const metricsCards: MetricCard[] = metrics ? [
    {
      title: "Page Views",
      value: formatNumber(metrics.overview.pageViews),
      change: calculateChange(),
      icon: <Visibility />,
      color: "#6366f1",
    },
    {
      title: "Unique Visitors",
      value: formatNumber(metrics.overview.uniqueVisitors),
      change: calculateChange(),
      icon: <People />,
      color: "#10b981",
    },
    {
      title: "Avg. Session Duration",
      value: formatDuration(metrics.overview.avgSessionDuration),
      change: calculateChange(),
      icon: <Schedule />,
      color: "#f59e0b",
    },
    {
      title: "Bounce Rate",
      value: `${metrics.overview.bounceRate.toFixed(1)}%`,
      change: calculateChange(),
      icon: <TrendingUp />,
      color: "#ef4444",
    },
    {
      title: "Contact Form Submissions",
      value: formatNumber(metrics.overview.contactForms),
      change: calculateChange(),
      icon: <Assignment />,
      color: "#8b5cf6",
    },
    {
      title: "Project Views",
      value: formatNumber(metrics.overview.projectViews),
      change: calculateChange(),
      icon: <AccountTree />,
      color: "#06b6d4",
    },
    {
      title: "Social Clicks",
      value: formatNumber(metrics.overview.socialClicks),
      change: calculateChange(),
      icon: <TouchApp />,
      color: "#ec4899",
    },
    {
      title: "Blog Reads",
      value: formatNumber(metrics.overview.blogReads),
      change: calculateChange(),
      icon: <Language />,
      color: "#14b8a6",
    },
  ] : [];

  // Chart data from Firebase
  const pageViewsData: ChartData[] = metrics?.pageViewsTrend.map(item => ({
    name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    views: item.views,
    visitors: item.visitors || 0,
  })) || [];

  const topPagesData: ChartData[] = metrics?.topPages.map(item => ({
    name: item.path.replace(/^\//, '') || 'Home',
    value: item.views,
  })) || [];

  const trafficSourcesData: ChartData[] = metrics?.trafficSources.map(item => ({
    name: item.source.charAt(0).toUpperCase() + item.source.slice(1),
    value: item.percentage,
  })) || [];

  const deviceData: ChartData[] = metrics?.deviceBreakdown.map(item => ({
    name: item.device.charAt(0).toUpperCase() + item.device.slice(1),
    value: item.percentage,
  })) || [];

  const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

  return (
    <>
      <SEO
        title="Admin Dashboard | Victor Williams"
        description="Protected admin dashboard with analytics and insights"
        url="https://vaporjawn.github.io/admin"
      />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Dashboard Title */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Manage analytics, blog posts, and site content
          </Typography>
        </Box>

        {/* Tabs Navigation */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
            <Tab
              label="Analytics Dashboard"
              icon={<BarChartIcon />}
              iconPosition="start"
              {...a11yProps(0)}
            />
            <Tab
              label="Blog Posts"
              icon={<EditNote />}
              iconPosition="start"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>

        {/* Analytics Tab */}
        <TabPanel value={activeTab} index={0}>

        {/* Time Range Selector */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap", mb: 4 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
              disabled={loading}
            >
              <MenuItem value="1">Last 24 Hours</MenuItem>
              <MenuItem value="7">Last 7 Days</MenuItem>
              <MenuItem value="30">Last 30 Days</MenuItem>
              <MenuItem value="90">Last 90 Days</MenuItem>
              <MenuItem value="365">Last Year</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            size="small"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            disabled={loading}
            sx={{ textTransform: "none" }}
          >
            Refresh
          </Button>

          <Chip label="Firebase Data" color="success" size="small" />
          {lastUpdated && (
            <Chip
              label={`Updated: ${lastUpdated.toLocaleTimeString()}`}
              variant="outlined"
              size="small"
            />
          )}
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }} onClose={() => setError(null)}>
            <AlertTitle>Error Loading Data</AlertTitle>
            {error}. Please check Firebase configuration and try again.
          </Alert>
        )}

        {/* Empty State Alert */}
        {!loading && !error && metrics && metrics.overview.pageViews === 0 && (
          <Alert severity="info" sx={{ mb: 4 }}>
            <AlertTitle>No Data Available Yet</AlertTitle>
            Start browsing the portfolio to generate analytics. Page views, project interactions, and other events will appear here.
          </Alert>
        )}

        {loading && <LinearProgress sx={{ mb: 2 }} />}

        {/* Key Metrics Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {loading ? (
            // Loading skeletons
            Array.from({ length: 8 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card elevation={0} sx={{ height: "100%", border: 1, borderColor: "divider" }}>
                  <CardContent>
                    <Skeleton variant="circular" width={40} height={40} sx={{ mb: 2 }} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="text" width="30%" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            metricsCards.map((metric, index) => (
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
          )))}
        </Grid>

        {/* Charts Grid */}
        {!loading && !error && metrics && (
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
                {pageViewsData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={pageViewsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Line type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} name="Page Views" />
                      <Line type="monotone" dataKey="visitors" stroke="#10b981" strokeWidth={2} name="Unique Visitors" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                    <Typography variant="body2" color="text.secondary">No data available</Typography>
                  </Box>
                )}
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
                {trafficSourcesData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={trafficSourcesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value.toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {trafficSourcesData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                    <Typography variant="body2" color="text.secondary">No data available</Typography>
                  </Box>
                )}
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
                {topPagesData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topPagesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="value" fill="#6366f1" name="Page Views" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                    <Typography variant="body2" color="text.secondary">No data available</Typography>
                  </Box>
                )}
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
                {deviceData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value.toFixed(1)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {deviceData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                    <Typography variant="body2" color="text.secondary">No data available</Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Loading State for Charts */}
        {loading && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: "divider" }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 8 }}>
                  <CircularProgress />
                  <Typography variant="body2" color="text.secondary">Loading analytics data...</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button variant="outlined" href="https://console.firebase.google.com" target="_blank">
            Open Firebase Console
          </Button>
          <Button variant="outlined" href="https://analytics.google.com" target="_blank">
            Open Google Analytics
          </Button>
          <Button variant="outlined" href="https://search.google.com/search-console" target="_blank">
            Open Search Console
          </Button>
          <Button variant="outlined" onClick={() => window.location.reload()}>
            Refresh Data
          </Button>
        </Box>
        </TabPanel>

        {/* Blog Posts Tab */}
        <TabPanel value={activeTab} index={1}>
          <BlogPostsList />
        </TabPanel>
      </Container>
    </>
  );
};

export default AdminDashboard;
