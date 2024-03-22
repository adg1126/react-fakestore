import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  tabIndex: 0,
  drawerOpen: false,
};

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setTabIndex(state, action) {
      state.tabs.tabIndex = action.payload;
    },
    setDrawerOpen(state, action) {
      state.tabs.drawerOpen = action.payload;
    },
  },
});

export const { setTabIndex, setDrawerOpen } = tabsSlice.actions;

const selecTabs = (state) => state.tabs;

export const selectTabIndex = createSelector(
    [selecTabs],
    (tabs) => tabs.tabIndex
  ),
  selectDrawerOpen = createSelector([selecTabs], (tabs) => tabs.drawerOpen);

export default tabsSlice.reducer;
