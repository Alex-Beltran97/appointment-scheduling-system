import { Box, Button, CardContent, List, ListItem, Typography } from "@mui/material";

import type { Benefit, Plan } from "../../../types/auth/Plans";
import { useNavigate } from "react-router-dom";

const PlansComponent = ({name, benefits}: Plan) => {
  const navigate = useNavigate();

  return (
    <CardContent>
      <Typography variant="h6" component="h2" textAlign="center" gutterBottom>
        Plan {name}
      </Typography>
      <Box>
        <Typography variant="body1" component="h3" textAlign="center" gutterBottom>
          Beneficios
        </Typography>
        <List>
          {benefits.map((benefit, index) => (
            <BenefitList key={index} {...benefit} />
          ))}
        </List>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('/suscribe-plan', { replace: true })}
          color="secondary"
        >Contratar Plan</Button>
      </Box>
    </CardContent>
  );
};

const BenefitList = ({label, value}: Benefit) => {
  return (
    <ListItem sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <Typography variant="body2" component="p" gutterBottom>
        {label}:
      </Typography>
      <Typography variant="body2" component="p" gutterBottom>
        {value}
      </Typography>
    </ListItem>
  );
};

export default PlansComponent;