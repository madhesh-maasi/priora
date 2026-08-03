import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '@/screens/dashboard/DashboardScreen';
import { TodayScheduleScreen } from '@/screens/dashboard/TodayScheduleScreen';
import { UpcomingTasksScreen } from '@/screens/dashboard/UpcomingTasksScreen';
import { KanbanBoardScreen } from '@/screens/dashboard/KanbanBoardScreen';
import { CalendarScreen } from '@/screens/dashboard/CalendarScreen';
import { TimelineScreen } from '@/screens/dashboard/TimelineScreen';
import { AllTasksScreen } from '@/screens/dashboard/AllTasksScreen';
import { OverdueTasksScreen } from '@/screens/dashboard/OverdueTasksScreen';
import { CompletedTasksScreen } from '@/screens/dashboard/CompletedTasksScreen';

export type DashboardStackParamList = {
  Dashboard: undefined;
  Today: undefined;
  Upcoming: undefined;
  Kanban: undefined;
  Calendar: undefined;
  Timeline: undefined;
  AllTasks: undefined;
  Overdue: undefined;
  Completed: undefined;
};

const Stack = createNativeStackNavigator<DashboardStackParamList>();
const Tab = createBottomTabNavigator();

const DashboardStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        cardStyle: { backgroundColor: '#ffffff' },
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
      <Stack.Screen name="Today" component={TodayScheduleScreen} options={{ title: 'Today' }} />
      <Stack.Screen name="Upcoming" component={UpcomingTasksScreen} options={{ title: 'Upcoming' }} />
      <Stack.Screen name="Kanban" component={KanbanBoardScreen} options={{ title: 'Kanban Board' }} />
      <Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: 'Calendar' }} />
      <Stack.Screen name="Timeline" component={TimelineScreen} options={{ title: 'Timeline' }} />
      <Stack.Screen name="AllTasks" component={AllTasksScreen} options={{ title: 'All Tasks' }} />
      <Stack.Screen name="Overdue" component={OverdueTasksScreen} options={{ title: 'Overdue' }} />
      <Stack.Screen name="Completed" component={CompletedTasksScreen} options={{ title: 'Completed' }} />
    </Stack.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#a3a3a3',
      }}
    >
      <Tab.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tab.Screen
        name="TasksStack"
        component={DashboardStack}
        options={{
          title: 'Tasks',
          tabBarLabel: 'Tasks',
        }}
      />
    </Tab.Navigator>
  );
};
