import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

export type AppGetServerSideProps<
  P extends { [key: string]: any; urls: { [key: string]: string } } = {
    [key: string]: any;
    urls: { [key: string]: string };
  },
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = (context: GetServerSidePropsContext<Q>) => Promise<GetServerSidePropsResult<P>>;
