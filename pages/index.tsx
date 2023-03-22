import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Navbar from "@/components/navbar";
import Billboard from "@/components/bilboard";
import MovieList from "@/components/movie-list";
import useMoviesList from "@/hooks/useMoviesList";
import useFavorites from "@/hooks/useFavourites";
import InfoModel from "@/components/info-model";
import useInfoModelStore from "@/hooks/useInfoModelStore";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
} 

export default function Home() {
  const { data: movies = [] } = useMoviesList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModel } = useInfoModelStore();

  return (
    <>
      <InfoModel visible={isOpen} onClose={closeModel} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  )
}
