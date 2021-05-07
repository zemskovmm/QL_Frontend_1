import {GetServerSidePropsContext, Redirect} from "next";
import { ParsedUrlQuery } from "querystring";

export function handleLanguageAndRedirects(
  context: GetServerSidePropsContext<ParsedUrlQuery>,
  urls: { [lang: string]: string }
) : {redirect: Redirect} | undefined {
   return undefined;
}
