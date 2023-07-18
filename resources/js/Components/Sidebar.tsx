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
        {/* <li>
          <Link href="/periods" as="button" type="button">Periodos</Link>
        </li>
        <li><Link href="/courses" as="button" type="button">Cursos</Link></li>
        <li><Link href="/notes" as="button" type="button">Notas</Link></li>
        <li><Link href="/students" as="button" type="button">Estudiantes</Link></li>
        <li><Link href="/representatives" as="button" type="button">Representantes</Link></li>
        <li><Link href="/tuitions" as="button" type="button">Matriculas</Link></li>
        <li><Link href="/subjects" as="button" type="button">Materias</Link></li>
        <li><Link href="/parallels" as="button" type="button">Paralelos</Link></li>
        <li><Link href="/schedules" as="button" type="button">Horarios</Link></li>
        <li><Link href="/teachers" as="button" type="button">Profesores</Link></li> */}
        {items.map((item, index) => {
          return (
            <li className={url === item.path  ? 'active' : ''} key={item.path}><Link  href={item.path} as="button" type="button"><i className={item.icon}></i> {item.name}</Link></li>
          )
        })}
      </ul>
    </div>
  )
};

export default Sidebar;