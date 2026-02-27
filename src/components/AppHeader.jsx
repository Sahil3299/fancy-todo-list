import { Add, Assignment, Dashboard } from '@mui/icons-material';
import { AppBar, Button, Toolbar, Typography, Box } from '@mui/material';
import { usePopupState } from 'material-ui-popup-state/hooks';

import { NewListDialog } from './NewListDialog.jsx';

export function AppHeader() {
  const dialogState = usePopupState({ variant: 'dialog', popupId: 'new-list' });

  return (
    <>
      <NewListDialog dialogState={dialogState} />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ 
          zIndex: theme => theme.zIndex.drawer + 1,
          background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Dashboard sx={{ fontSize: 28 }} />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600, letterSpacing: 0.5 }}>
            Todo Lists
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={dialogState.open}
            sx={{
              borderRadius: 8,
              textTransform: 'none',
              fontWeight: 500,
              px: 2.5,
              py: 0.8,
              backgroundColor: '#00bfa5',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              '&:hover': {
                backgroundColor: '#00897b',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            New List
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
