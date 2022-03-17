import React from "react";
import { Helmet } from "react-helmet";

interface TitleMetaProps {
  title: string;
  descriptionContent?: string;
  keywordsContent?: string;
}

const TitleMeta: React.FC<TitleMetaProps> = ({
  title,
  descriptionContent,
  keywordsContent,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={descriptionContent} />
      <meta name="keywords" content={keywordsContent} />
    </Helmet>
  );
};

TitleMeta.defaultProps = {
  title: "Welcome to PropShop",
  descriptionContent: "We sell the best products for cheap",
  keywordsContent: "electronics, buy electronics, cheap electronics",
};
export default TitleMeta;
