import { useIntl } from "react-intl";
import { NewsletterBlock } from "@project/components/src/blocks/NewsletterBlock/NewsletterBlock";

const BlogPage = () => {
  const lang = useIntl().locale;

  return (
    <>
      <NewsletterBlock />
    </>
  );
};

export default BlogPage;
