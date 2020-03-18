import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Box } from 'grommet';
import usePageTitle from '@hooks/usePageTitle';
import Head from 'next/head';
import useAppContents from '@hooks/useAppContents';
import Layout from '@components/Layout';

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}

type PageType = InferProps<typeof propTypes>

const Page: React.FC<PageType> = ({
  children,
  title,
  description
}) => {
  const fullTitle = usePageTitle(title);
  const contents = useAppContents();
  
  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description || contents.getIn(['general', 'description'])} />

        {/* <meta property="og:description" content={description || contents.getIn(['general', 'description'])} /> */}
        {/* <meta property="twitter:description" content={description || contents.getIn(['general', 'description'])} /> */}
        {/* <meta property="og:title" content={getTitle(title)} /> */}
        {/* <meta property="og:image" content={socialBanner} /> */}
        {/* <meta property="twitter:title" content={getTitle(title)} /> */}
        {/* <meta property="twitter:image" content={socialBanner} /> */}
      </Head>
      <Layout>
        {children}
      </Layout>
    </>
  );
}

export default Page;
