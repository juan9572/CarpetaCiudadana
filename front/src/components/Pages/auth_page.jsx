import React from "react";
import AuthCiudadano from '../Auth/auth_ciudadanos'
import AuthAdmins from '../Auth/auth_admins'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  UserPlusIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

export default function Auth() {
  const data = [
    {
      label: "Ciudadano",
      value: "ciudadano",
      icon: UserCircleIcon,
      desc: <AuthCiudadano />,
    },
    {
      label: "Admin",
      value: "admin",
      icon: UserPlusIcon,
      desc: <AuthAdmins />,
    },
  ];
  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs value="ciudadano">
        <TabsHeader>
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2">
                {React.createElement(icon, { className: "w-5 h-5" })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}