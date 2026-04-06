import { Box, Typography } from '@mui/material';
import { SuperAdminLayout } from '../components/layout/SuperAdminLayout';
import '../assets/styles/projectsPageTitle.css';

export function ProjectsPage() {
  return (
    <SuperAdminLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
        <Box
          sx={{
            height: 52,
            flexShrink: 0,
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            px: 0,
          }}
        >
          <Typography
            component="h1"
            sx={{
              margin: 0,
              fontSize: 20,
              fontWeight: 600,
              color: 'var(--projects-page-title-color)',
              lineHeight: 1.5,
            }}
          >
            Projects
          </Typography>
        </Box>
      </Box>
    </SuperAdminLayout>
  );
}
