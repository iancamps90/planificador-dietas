// src/components/Favorites.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Alert,
  Rating,
  Avatar,
  Tooltip,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  Restaurant as RestaurantIcon,
  FitnessCenter as FitnessIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Star as StarIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Share as ShareIcon,
  Download as DownloadIcon
} from '@mui/icons-material';

/**
 * Favorites Component - Sistema de favoritos completo
 * 
 * Conceptos que aprenderás:
 * 1. Advanced CRUD operations: Operaciones CRUD complejas
 * 2. Data categorization: Categorización de datos
 * 3. Search and filtering: Búsqueda y filtrado avanzado
 * 4. Rating system: Sistema de valoraciones
 * 5. Custom notes: Notas personalizadas
 * 6. Data export: Exportación de favoritos
 */

const Favorites = () => {
  const [favorites, setFavorites] = useState({
    meals: [],
    exercises: [],
    routines: []
  });
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', notes: '', rating: 0 });
  const [anchorEl, setAnchorEl] = useState(null);

  // Cargar favoritos del localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('userFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Guardar favoritos en localStorage
  const saveFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem('userFavorites', JSON.stringify(newFavorites));
  };

  // Añadir a favoritos
  const addToFavorites = (item, type) => {
    const newItem = {
      id: Date.now(),
      ...item,
      dateAdded: new Date().toISOString(),
      rating: 0,
      notes: '',
      tags: []
    };

    const newFavorites = {
      ...favorites,
      [type]: [...favorites[type], newItem]
    };

    saveFavorites(newFavorites);
  };

  // Eliminar de favoritos
  const removeFromFavorites = (id, type) => {
    const newFavorites = {
      ...favorites,
      [type]: favorites[type].filter(item => item.id !== id)
    };

    saveFavorites(newFavorites);
  };

  // Editar favorito
  const editFavorite = (id, type, updates) => {
    const newFavorites = {
      ...favorites,
      [type]: favorites[type].map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    };

    saveFavorites(newFavorites);
  };

  // Filtrar favoritos
  const getFilteredItems = (type) => {
    let items = favorites[type];

    // Filtrar por búsqueda
    if (searchTerm) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.notes.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por rating
    if (filterRating > 0) {
      items = items.filter(item => item.rating >= filterRating);
    }

    return items;
  };

  // Exportar favoritos
  const exportFavorites = () => {
    const dataToExport = {
      meals: favorites.meals,
      exercises: favorites.exercises,
      routines: favorites.routines,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mis_favoritos_fitness.json';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // Abrir diálogo de edición
  const openEditDialog = (item) => {
    setSelectedItem(item);
    setEditForm({
      name: item.name,
      notes: item.notes || '',
      rating: item.rating || 0
    });
    setEditDialog(true);
  };

  // Guardar edición
  const saveEdit = () => {
    if (selectedItem) {
      const type = favorites.meals.find(m => m.id === selectedItem.id) ? 'meals' :
                   favorites.exercises.find(e => e.id === selectedItem.id) ? 'exercises' : 'routines';
      
      editFavorite(selectedItem.id, type, {
        name: editForm.name,
        notes: editForm.notes,
        rating: editForm.rating
      });
    }
    setEditDialog(false);
    setSelectedItem(null);
  };

  const tabLabels = ['Comidas', 'Ejercicios', 'Rutinas'];
  const currentItems = getFilteredItems(['meals', 'exercises', 'routines'][activeTab]);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <FavoriteIcon color="primary" />
          Mis Favoritos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gestiona tus comidas, ejercicios y rutinas favoritas
        </Typography>
      </Box>

      {/* Barra de herramientas */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Buscar en favoritos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Filtrar por rating"
                value={filterRating}
                onChange={(e) => setFilterRating(Number(e.target.value))}
                size="small"
              >
                <MenuItem value={0}>Todos</MenuItem>
                <MenuItem value={1}>1+ estrella</MenuItem>
                <MenuItem value={2}>2+ estrellas</MenuItem>
                <MenuItem value={3}>3+ estrellas</MenuItem>
                <MenuItem value={4}>4+ estrellas</MenuItem>
                <MenuItem value={5}>5 estrellas</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={exportFavorites}
                  size="small"
                >
                  Exportar
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ShareIcon />}
                  size="small"
                >
                  Compartir
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab
            icon={<RestaurantIcon />}
            label={`Comidas (${favorites.meals.length})`}
            iconPosition="start"
          />
          <Tab
            icon={<FitnessIcon />}
            label={`Ejercicios (${favorites.exercises.length})`}
            iconPosition="start"
          />
          <Tab
            icon={<StarIcon />}
            label={`Rutinas (${favorites.routines.length})`}
            iconPosition="start"
          />
        </Tabs>

        <CardContent>
          {currentItems.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <FavoriteIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No tienes {tabLabels[activeTab].toLowerCase()} en favoritos
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Añade elementos desde las otras secciones usando el botón ❤️
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {currentItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card sx={{ height: '100%', position: 'relative' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" sx={{ flexGrow: 1, mr: 1 }}>
                          {item.name}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            setAnchorEl(e.currentTarget);
                            setSelectedItem(item);
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Rating
                          value={item.rating}
                          readOnly
                          size="small"
                        />
                      </Box>

                      {item.calories && (
                        <Chip
                          label={`${item.calories} kcal`}
                          size="small"
                          color="primary"
                          sx={{ mb: 1 }}
                        />
                      )}

                      {item.notes && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {item.notes}
                        </Typography>
                      )}

                      <Typography variant="caption" color="text.secondary">
                        Añadido: {new Date(item.dateAdded).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Menú contextual */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => {
          openEditDialog(selectedItem);
          setAnchorEl(null);
        }}>
          <EditIcon sx={{ mr: 1 }} />
          Editar
        </MenuItem>
        <MenuItem onClick={() => {
          const type = favorites.meals.find(m => m.id === selectedItem.id) ? 'meals' :
                       favorites.exercises.find(e => e.id === selectedItem.id) ? 'exercises' : 'routines';
          removeFromFavorites(selectedItem.id, type);
          setAnchorEl(null);
        }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Eliminar
        </MenuItem>
      </Menu>

      {/* Diálogo de edición */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Favorito</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Notas"
            value={editForm.notes}
            onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">Rating:</Typography>
            <Rating
              value={editForm.rating}
              onChange={(e, newValue) => setEditForm({ ...editForm, rating: newValue })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancelar</Button>
          <Button onClick={saveEdit} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Favorites;
