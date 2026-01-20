import * as Icons from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  ToggleButton,
  Typography,
  Grid,
  Fade,
  Zoom,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useTodoLists } from '../hooks/useTodoLists.js';

export function NewListDialog({ dialogState }) {
  const [state, setState] = useState('');
  const [iconSearch, setIconSearch] = useState('');
  const [icon, setIcon] = useState('');
  const { newList } = useTodoLists();

  const [filteredIcons, setFilteredIcons] = useState(Object.entries(Icons));

  useEffect(() => {
    setFilteredIcons(
      Object.entries(Icons)
        .filter(([name]) => !/Outlined$|TwoTone$|Rounded$|Sharp$/.test(name))
        .filter(([name]) => (iconSearch ? name.toLowerCase().includes(iconSearch.toLowerCase()) : true))
        .slice(0, 12)
    );
  }, [iconSearch]);

  return (
    <Dialog
      open={dialogState.isOpen}
      onClose={dialogState.close}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Fade}
      transitionDuration={300}
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
          Create New Todo List
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: 'center', mb: 3 }}>
          Give your new list a name and choose an icon to make it unique!
        </DialogContentText>
        <TextField
          onChange={event => {
            setState(event.target.value);
          }}
          value={state}
          autoFocus
          margin="dense"
          id="name"
          label="List Name"
          type="text"
          fullWidth
          variant="outlined"
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
        <TextField
          onChange={event => {
            setIconSearch(event.target.value);
          }}
          value={iconSearch}
          margin="dense"
          id="icon-search"
          label="Search Icons"
          type="text"
          fullWidth
          variant="outlined"
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
        <Card
          variant="outlined"
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e8eaf6 100%)',
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 2, textAlign: 'center', fontWeight: 500 }}>
            Choose an Icon
          </Typography>
          <Grid container spacing={1} justifyContent="center">
            {filteredIcons.map(([name, Icon], index) => (
              <Grid item key={name}>
                <Zoom in={true} timeout={200 + index * 50}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: 60,
                    }}
                  >
                    <ToggleButton
                      value={name}
                      selected={name === icon}
                      onClick={() => setIcon(name)}
                      sx={{
                        borderRadius: 2,
                        width: 48,
                        height: 48,
                        '&.Mui-selected': {
                          backgroundColor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                          },
                        },
                      }}
                    >
                      <Icon />
                    </ToggleButton>
                    <Typography
                      variant="caption"
                      align="center"
                      sx={{
                        mt: 0.5,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        maxWidth: 60,
                        fontSize: '0.7rem',
                      }}
                    >
                      {name}
                    </Typography>
                  </Box>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Card>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          onClick={dialogState.close}
          variant="outlined"
          sx={{ borderRadius: 20, px: 3 }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (state.trim()) {
              void newList(state, icon);
              dialogState.close();
              setState('');
              setIcon('');
              setIconSearch('');
            }
          }}
          variant="contained"
          disabled={!state.trim()}
          sx={{
            borderRadius: 20,
            px: 3,
            background: 'linear-gradient(45deg, #6200ea 30%, #03dac6 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #6200ea 40%, #03dac6 100%)',
            },
          }}
        >
          Create List
        </Button>
      </DialogActions>
    </Dialog>
  );
}
