import type { NextPage, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { Grid, Container } from "@mui/material";

import { fetchJSON, API_ROOT, isError } from "../utils/fetchJSON";
import type { Photo } from "../types";
import { MetaTags } from "../components/meta-tags";
import GridCard from "../components/grid-card";

type VaultProps = {
  photos: Photo[];
};

type Vault = NextPage<VaultProps>;
const Vault: Vault = ({ photos = [] }) => {
  console.log({ photos });
  return (
    <>
      <Head>
        <MetaTags
          title="Vault page"
          description="Cool description of the vault page"
        />
      </Head>
      <Container sx={{ pt: 2.5 }} maxWidth="md">
        <Grid container spacing={4}>
          {photos.map((photo) => (
            <GridCard key={photo.id} photo={photo} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Vault;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const photosResponse = await fetchJSON<Photo[]>(
      `${API_ROOT}/photos?_limit=20`
    );

    if (isError(photosResponse)) {
      context.res.writeHead(302, { Location: "/404" });
      context.res.end();
      return {
        props: {},
      };
    }

    return {
      props: {
        photos: photosResponse,
      },
    };
  } catch (error) {
    console.error(error);
  }

  return {
    notFound: true,
  };
}
