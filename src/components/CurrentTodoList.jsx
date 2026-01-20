import { DeleteOutlineRounded, Send, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import * as Icons from '@mui/icons-material';
import {
  Box,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
  Paper,
  Fade,
  Grow,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useTodoList } from '../hooks/useTodoList.js';
import { useTodoLists } from '../hooks/useTodoLists.js';
import { useAppState } from '../providers/AppState.jsx';

export function CurrentTodoList() {
  const { currentList } = useAppState();
  const { data, newItem, deleteItem, toggleChecked, updateItem } =
    useTodoList(currentList);
  const { updateList } = useTodoLists();
  const [newItemText, setNewItemText] = useState('');
  const [originalListName, setOriginalListName] = useState('');
  const [originalListItems, setOriginalListItems] = useState({});

  useEffect(() => {
    if (data?.name) {
      setOriginalListName(data.name);
    }
  }, [currentList, data?.name]);

  useEffect(() => {
    if (data?.items) {
      setOriginalListItems(
        data.items.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {})
      );
    }
  }, [data]);

  const Icon = Icons[data?.icon];

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5' }}>
      <Toolbar />
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {data ? (
          <Fade in={true} timeout={500}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box
                  sx={{
                    background: 'linear-gradient(45deg, #6200ea 30%, #03dac6 90%)',
                    p: 2,
                    mr: 2,
                    borderRadius: '50%',
                    display: 'flex',
                    color: 'white',
                    boxShadow: '0 4px 8px rgba(98, 0, 234, 0.3)',
                  }}
                >
                  {Icon ? (
                    <Icon fontSize="large" />
                  ) : (
                    <Icons.List fontSize="large" />
                  )}
                </Box>
                <TextField
                  value={originalListName}
                  onChange={event => {
                    setOriginalListName(event.target.value);
                  }}
                  onBlur={event => {
                    void updateList(data.id, event.target.value);
                  }}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      borderRadius: 2,
                    },
                  }}
                  InputProps={{
                    sx: { fontSize: '1.5rem', fontWeight: 600 },
                  }}
                />
              </Box>
              <Divider sx={{ mb: 3 }} />
              <List sx={{ width: '100%', bgcolor: 'transparent' }}>
                {data.items.map(({ id, checked }, index) => {
                  const labelId = `checkbox-list-label-${id}`;

                  return (
                    <Grow in={true} timeout={300 + index * 100} key={id}>
                      <ListItem
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => deleteItem(id)}
                            sx={{
                              color: 'error.main',
                              '&:hover': {
                                backgroundColor: 'error.light',
                                color: 'white',
                              },
                            }}
                          >
                            <DeleteOutlineRounded />
                          </IconButton>
                        }
                        disablePadding
                        sx={{
                          mb: 1,
                          backgroundColor: checked ? 'rgba(3, 218, 198, 0.1)' : 'white',
                          borderRadius: 2,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <ListItemButton
                          role={undefined}
                          onClick={() => toggleChecked(id)}
                          dense
                          sx={{
                            borderRadius: 2,
                            '&:hover': {
                              backgroundColor: 'rgba(98, 0, 234, 0.05)',
                            },
                          }}
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked ?? false}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                              icon={<RadioButtonUnchecked />}
                              checkedIcon={<CheckCircle sx={{ color: '#03dac6' }} />}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId}>
                            <TextField
                              onClick={e => e.stopPropagation()}
                              onChange={event => {
                                setOriginalListItems({
                                  ...originalListItems,
                                  [id]: event.target.value,
                                });
                              }}
                              onBlur={event => {
                                void updateItem(id, event.target.value);
                              }}
                              value={originalListItems[id] ?? ''}
                              size="small"
                              variant="standard"
                              fullWidth
                              InputProps={{
                                disableUnderline: true,
                                sx: {
                                  fontSize: '1rem',
                                  textDecoration: checked ? 'line-through' : 'none',
                                  color: checked ? 'text.secondary' : 'text.primary',
                                },
                              }}
                            />
                          </ListItemText>
                        </ListItemButton>
                      </ListItem>
                    </Grow>
                  );
                })}
                <ListItem>
                  <Box
                    component="form"
                    sx={{ width: 1, mt: 2 }}
                    onSubmit={event => {
                      event.preventDefault();
                      void newItem(newItemText);
                      setNewItemText('');
                    }}
                  >
                    <TextField
                      onChange={event => {
                        setNewItemText(event.target.value);
                      }}
                      value={newItemText}
                      margin="normal"
                      id="new-item"
                      label="Add a new task..."
                      type="text"
                      fullWidth
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          backgroundColor: 'white',
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="submit"
                              onClick={() => {
                                document.activeElement.blur();
                              }}
                              edge="end"
                              sx={{
                                color: 'primary.main',
                                '&:hover': {
                                  backgroundColor: 'primary.light',
                                  color: 'white',
                                },
                              }}
                            >
                              <Send />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </ListItem>
              </List>
            </Paper>
          </Fade>
        ) : (
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: 'center',
              borderRadius: 3,
              background: 'linear-gradient(45deg, #f5f5f5 30%, #e8eaf6 90%)',
            }}
          >
            <Typography variant="h5" color="text.secondary">
              No List Selected
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Choose a list from the sidebar to get started!
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
}
