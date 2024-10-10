import {
  Tabs as ReachTabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@reach/tabs";

Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanels = TabPanels;
Tabs.TabPanel = TabPanel;

export default function Tabs({ children, ...otherProps }) {
  return <ReachTabs {...otherProps}>{children}</ReachTabs>;
}
