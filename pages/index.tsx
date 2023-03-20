import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Navbar from "@/components/navbar";
import Billboard from "@/components/bilboard";
import MovieList from "@/components/movie-list";
import useMoviesList from "@/hooks/useMoviesList";

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

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
      </div>
    </>
  )
}
