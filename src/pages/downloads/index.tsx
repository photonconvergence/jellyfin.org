import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Admonition from '@theme-original/Admonition';

import Pill from '../../components/common/Pill';
import DownloadDetails from '../../components/downloads/DownloadDetails';
import { Downloads, OsType } from '../../data/downloads';

import styles from './index.module.scss';

export default function DownloadsPage({ osType = OsType.Linux }: { osType?: OsType }) {
  const [isStableLinks, setIsStableLinks] = useState<boolean>(true);
  const [isStableHelpVisible, setIsStableHelpVisible] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string>();

  return (
    <Layout title='Downloads'>
      <h1 className='text--center margin-bottom--sm'>Downloads</h1>
      <div className='text--center'>
        <a href='https://github.com/jellyfin/jellyfin/releases/latest'>
          <img alt='Current Release' src='https://img.shields.io/github/release/jellyfin/jellyfin.svg' />
        </a>
      </div>

      <main className='margin-top--md margin-bottom--lg'>
        <section className='container'>
          <div className='row'>
            <div className='col margin-bottom--md'>
              <div className='pills' style={{ overflowX: 'auto' }}>
                <Link
                  to='/downloads'
                  className={clsx('pills__item', { 'pills__item--active': osType === OsType.Linux })}
                >
                  Linux
                </Link>
                <Link
                  to='/downloads/windows'
                  className={clsx('pills__item', { 'pills__item--active': osType === OsType.Windows })}
                >
                  Windows
                </Link>
                <Link
                  to='/downloads/macos'
                  className={clsx('pills__item', { 'pills__item--active': osType === OsType.MacOS })}
                >
                  MacOS
                </Link>
                <Link
                  to='/downloads/docker'
                  className={clsx('pills__item', { 'pills__item--active': osType === OsType.Docker })}
                >
                  Docker
                </Link>
              </div>
            </div>

            <div className={clsx('col', 'margin-bottom--md', styles['stable-links-container'])}>
              <ul className={clsx('pills', 'margin-bottom--none', styles['stable-links'])}>
                <Pill
                  active={isStableLinks}
                  onClick={() => {
                    setIsStableLinks(true);
                    setActiveButton(null);
                  }}
                >
                  Stable
                </Pill>
                <Pill
                  active={!isStableLinks}
                  onClick={() => {
                    setIsStableLinks(false);
                    setActiveButton(null);
                  }}
                >
                  Unstable
                </Pill>
              </ul>

              <button
                className='button button--link'
                onClick={() => {
                  setIsStableHelpVisible(!isStableHelpVisible);
                }}
                style={{
                  verticalAlign: 'baseline'
                }}
              >
                Help?
              </button>
            </div>
          </div>

          {isStableHelpVisible && (
            <Admonition type='tip' title='Stable or Unstable?'>
              <p>
                Generally, if you&apos;re a new user or value stability use the stable version. It won&apos;t change
                very often. If you want to help test the latest improvements and features and can handle some occasional
                breakage, use the unstable version. Always back up your existing configuration before testing unstable
                releases.
              </p>
            </Admonition>
          )}

          {Downloads.filter(
            (download) =>
              // OS Type matches filter
              download.osTypes.includes(osType) &&
              // Ensure there are unstable links if unstable is selected
              (isStableLinks || download.unstableButtons.length > 0)
          ).map((download) => (
            <DownloadDetails
              key={download.id}
              download={download}
              isStableLinks={isStableLinks}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          ))}
        </section>
      </main>
    </Layout>
  );
}
