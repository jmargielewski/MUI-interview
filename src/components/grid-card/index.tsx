import { useState } from "react";

import { Card, CardMedia, Grid, Backdrop } from "@mui/material";
import { Photo } from "../../types";

type GridCard = {
  photo: Photo;
};

export default function GridCard({ photo }: GridCard) {
  const [open, setOpen] = useState(false);

  return (
    <Grid item key={photo.id} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          sx={{ pt: "100%", height: "150px", cursor: "pointer" }}
          image={photo.thumbnailUrl}
          title="Image title"
          role="img"
          onClick={() => setOpen(true)}
        />

        {open && (
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: 100,
            }}
            open={open}
            onClick={() => setOpen(false)}
          >
            <img src={photo.url} alt={photo.title} />
          </Backdrop>
        )}
      </Card>
    </Grid>
  );
}
