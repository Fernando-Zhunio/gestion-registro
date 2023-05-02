import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const DialogCustom = ({ open, title, children, slotAction }: any) => {
    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            {/* <List sx={{ pt: 0 }}>
          {emails.map((email) => (
            <ListItem disableGutters>
              <ListItemButton onClick={() => handleListItemClick(email)} key={email}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disableGutters>
            <ListItemButton
              autoFocus
              onClick={() => handleListItemClick('addAccount')}
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add account" />
            </ListItemButton>
          </ListItem>
        </List> */}
            <DialogContent>{children}</DialogContent>
            {slotAction}
        </Dialog>
    );
};

export default DialogCustom;
