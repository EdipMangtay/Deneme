// React Imports
import { useState } from 'react';

// MUI Imports
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

type Props = {
  open: boolean;
  handleClose: () => void;
  departmentData: { name: string; manager: string; description: string };
  onSubmit: (data: { name: string; manager: string; description: string }) => void;
};

const EditDepartmentDrawer = ({ open, handleClose, departmentData, onSubmit }: Props) => {
  // State
  const [name, setName] = useState(departmentData.name || '');
  const [manager, setManager] = useState(departmentData.manager || '');
  const [description, setDescription] = useState(departmentData.description || '');

  // Form Submit
  const handleFormSubmit = () => {
    onSubmit({ name, manager, description });
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Typography variant="h6">Departman Düzenle</Typography>
        <IconButton size="small" onClick={handleClose}>
          <i className="tabler-x" />
        </IconButton>
      </div>
      <Divider />

      {/* Form */}
      <div className="p-6 flex flex-col gap-4">
        <TextField
          label="Departman Adı"
          value={name}
          variant="outlined"
          fullWidth
          disabled
          InputProps={{ style: { backgroundColor: '#f5f5f5' } }} // Disabled stil
        />
        <TextField
          label="Departman Sorumlusu"
          value={manager}
          variant="outlined"
          fullWidth
          onChange={(e) => setManager(e.target.value)}
        />
        <TextField
          label="Açıklaması"
          value={description}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outlined" color="error" onClick={handleClose}>
            İptal
          </Button>
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>
            Düzenle
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default EditDepartmentDrawer;
