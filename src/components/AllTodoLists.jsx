import * as Icons from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { useEffect } from 'react';

import { useTodoLists } from '../hooks/useTodoLists.js';
import { useAppState } from '../providers/AppState.jsx';

export function AllTodoLists() {
  const { data } = useTodoLists(); // add loading
  const { currentList, setCurrentList } = useAppState();

  useEffect(() => {
    if (!currentList) {
      setCurrentList(data[0]?.id);
    }
  }, [currentList, data, setCurrentList]);

  return (
    <Drawer
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRight: '1px solid #dee2e6',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          My Todo Lists
        </Typography>
        <Divider sx={{ mb: 2 }} />
      </Box>
      <List>
        {data.map(({ name, id, icon }) => {
          const Icon = Icons[icon];
          return (
            <ListItem key={id} disablePadding sx={{ px: 1 }}>
              <ListItemButton
                onClick={() => {
                  setCurrentList(id);
                }}
                selected={currentList === id}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  mb: 0.5,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'rgba(98, 0, 234, 0.08)',
                    transform: 'translateX(4px)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(98, 0, 234, 0.15)',
                    borderLeft: '4px solid #6200ea',
                    '&:hover': {
                      backgroundColor: 'rgba(98, 0, 234, 0.2)',
                    },
                  },
                }}
              >
                <Box sx={{ mr: 2, color: currentList === id ? '#6200ea' : 'inherit' }}>
                  {Icon ? <Icon /> : <Icons.List />}
                </Box>
                <ListItemText
                  primary={name}
                  primaryTypographyProps={{
                    fontWeight: currentList === id ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
