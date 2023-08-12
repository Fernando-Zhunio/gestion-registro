// import { WIDTH_SIDEBAR } from "@/Constants/constants";
import { IItemSidebar } from "@/Models/sidebar";
import { getItemSidebar } from "@/services/sidebar";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
// import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const Sidebar = ({items}: {items:IItemSidebar[]}) => {
  const { url } = usePage()

  return (
    <div className="sidebar">
      <ul>
        {items.map((item, index) => {
          return (
            <li className={url.includes(item.path)   ? 'active' : ''} key={item.path}><Link  href={item.path} as="button" type="button"><i className={item.icon}></i> {item.name}</Link></li>
          )
        })}
      </ul>
    </div>
  )
};

export default Sidebar;