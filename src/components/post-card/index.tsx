import React from "react";

import {
  Typography,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Collapse,
  IconButton,
  IconButtonProps,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

import { Post, Comment } from "../../types";

type PostCardProps = {
  post: Post;
  comments: Comment[];
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard({ post, comments }: PostCardProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const numOfComments = comments.length;

  return (
    <Grid item key={post.id} xs={12}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          sx={{ pt: "56.25%" }} // 16:9
          image="https://source.unsplash.com/random"
          title="Image title"
          role="image"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5">
            {post.title}
          </Typography>
          <Typography>{post.body}</Typography>
        </CardContent>
        {numOfComments > 0 && (
          <>
            <CardActions sx={{ p: 2 }}>
              <Typography color="primary">
                {/** TODO: handle pluralization base on numOfComments */}
                See {numOfComments} comments
              </Typography>
              <div>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </div>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                {comments.map((comment) => {
                  return (
                    <article key={comment.id}>
                      <Box sx={{ p: 2 }}>
                        <Typography variant="h6">{comment.name}</Typography>
                        <Typography variant="caption">
                          {comment.email}
                        </Typography>
                        <Typography paragraph>{comment.body}</Typography>
                        <Divider />
                      </Box>
                    </article>
                  );
                })}
              </CardContent>
            </Collapse>
          </>
        )}
      </Card>
    </Grid>
  );
}
