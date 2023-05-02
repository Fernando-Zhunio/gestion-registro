import { WIDTH_SIDEBAR } from "@/Constants/constants";
import { Link } from "@inertiajs/react";
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const Sidebar = () => {
    return (
        // <div className="sidebar px-5 py-4 position-fixed left-0 bg-white dark:bg-gray-800">
        //     <div>
        //         <ul className="inline-block">
        //             <li>
        //                 <a href="#" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200">
        //                     <span className="text-gray-600 dark:text-gray-400">
        //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        //                         </svg>
        //                     </span>
        //                     <span className="text-gray-600 dark:text-gray-400">Home</span>
        //                 </a>
        //             </li>

        //             <li>
        //                 <a href="#" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200">
        //                     <span className="text-gray-600 dark:text-gray-400">
        //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        //                         </svg>
        //                     </span>
        //                     <span className="text-gray-600 dark:text-gray-400">fernefc dsd fsvdd sfsdfs vds vdf vds</span>
        //                 </a>
        //             </li>

        //             <li>
        //                 <a href="#" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200">
        //                     <span className="text-gray-600 dark:text-gray-400">
        //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        //                         </svg>
        //                     </span>
        //                     <span className="text-gray-600 dark:text-gray-400">Home</span>
        //                 </a>
        //             </li>
                    
        //             <li>
        //                 <a href="#" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200">
        //                     <span className="text-gray-600 dark:text-gray-400">
        //                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        //                         </svg>
        //                     </span>
        //                     <span className="text-gray-600 dark:text-gray-400">Home</span>
        //                 </a>
        //             </li>
        //         </ul>
        //     </div>
        // </div>
        <Drawer
        className="bg-white dark:bg-gray-800"
        sx={{
          width: WIDTH_SIDEBAR,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: WIDTH_SIDEBAR,
            boxSizing: 'border-box',
            height: 'calc(100vh - var(--header-height))',
            top: 'var(--header-height)'
          },
        }}
        variant="persistent"
        anchor="left"
        open={true}
      >
        {/* <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader> */}
        {/* <Divider /> */}
        <List>
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon>
                    hjh
                </ListItemIcon>
                {/* <ListItemText primary={text} /> */}
                <Link href="/teachers" as="button" type="button">Profesores</Link>
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon>
                    hjh
                </ListItemIcon>
                {/* <ListItemText primary={text} /> */}
                <Link href="/periods" as="button" type="button">Periodos</Link>
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
    )
};

export default Sidebar;