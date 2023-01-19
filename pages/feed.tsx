import type { NextPage, GetServerSidePropsContext } from "next";
import Head from "next/head";
import {
  Typography,
  AppBar,
  Box,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
} from "@mui/material";

import { fetchJSON, API_ROOT, isError } from "../src/utils/fetchJSON";
import type { Post, Comment } from "../src/types";
import { MetaTags } from "../src/components/meta-tags";
import PostCard from "../src/components/post-card";

type FeedProps = {
  posts: Post[];
  comments: Record<number, Comment[]>;
};

type Feed = NextPage<FeedProps>;
const Feed: Feed = ({ posts = [], comments = [] }) => {
  return (
    <>
      <Head>
        <MetaTags
          title="Feed page"
          description="Cool description of the feed page"
        />
      </Head>

      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6">Hello To My Blog</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 2,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Blog about nature
            </Typography>
          </Container>

          <Container sx={{ pt: 2.5 }} maxWidth="md">
            <Grid container spacing={4}>
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  comments={comments[post.id]}
                />
              ))}
            </Grid>
          </Container>
        </Box>
      </main>
    </>
  );
};

export default Feed;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    // TODO: should be limited
    const postsResponse = await fetchJSON<Post[]>(
      `${API_ROOT}/posts?_limit=20`
    );

    if (isError(postsResponse)) {
      context.res.writeHead(302, { Location: "/404" });
      context.res.end();
      return {
        props: {},
      };
    }
    const postsIds = postsResponse.map((post) => post.id);

    // TODO: should be limited
    const commentsResponse = await Promise.all(
      postsIds.map((postId) => {
        return fetchJSON<Comment[]>(`${API_ROOT}/comments?postId=${postId}`);
      })
    );

    if (isError(commentsResponse)) {
      context.res.writeHead(302, { Location: "/404" });
      context.res.end();
      return {
        props: {},
      };
    }

    // TODO: adjust isError to handle array of arrays
    // for now I just casting type because of time.
    const commentsById = (commentsResponse as Comment[][]).reduce(
      (acc, commentsGroupe) => {
        return {
          ...acc,
          [commentsGroupe[0].postId]: commentsGroupe,
        };
      },
      {}
    );

    return {
      props: {
        posts: postsResponse,
        comments: commentsById,
      },
    };
  } catch (error) {
    console.error(error);
  }

  return {
    notFound: true,
  };
}
