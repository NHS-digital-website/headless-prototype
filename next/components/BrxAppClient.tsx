'use client';

/*
 * Copyright 2025-2026 Bloomreach
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import axios from 'axios';
import {BrComponent, BrPage} from '@bloomreach/react-sdk/client';
import Link from 'next/link';
import {Menu} from './Menu';
import {Banner} from './Banner';
import {Content} from './Content';
import {Configuration, PageModel} from '@bloomreach/spa-sdk';
import {useRelevance} from '../hooks/useRelevance';
import {
  Header,
  HeaderSearch,
} from "nhsuk-react-components";
import {FooterMenu} from "./FooterMenu";
import {CardsGrid} from "./CardsGrid";
import {Blog} from "./Blog";
import {BlogList} from "./BlogList";

interface Props {
  configuration: Omit<Configuration, 'httpClient'>;
  page: PageModel;
}

const BrxAppClient = ({configuration, page}: Props) => {
  console.log('Using BrxAppClient');
  
  const mapping = { Banner, CardsGrid, content: Content, blog: Blog, blogoverview: BlogList};

  useRelevance(configuration, page);

  return <BrPage configuration={{ ...configuration, httpClient: axios }} mapping={mapping} page={page}>
    {({ page: contextPage, mapping: pageMapping, component, isClientComponent }) => (
      <>
        <BrComponent path="header" page={contextPage} mapping={pageMapping} component={component} isClientComponent={isClientComponent}>
          {({ page: contextPage, mapping: pageMapping, component: headerComponent, isClientComponent }) =>
            <>
              <Header
                logo={{
                //   href: `${contextPage.getUrl()}`,
                //   src: `http://localhost:8080/site/binaries${contextPage.getChannelParameters().logo}`,
                }}
                service={{
                  href: `${contextPage.getUrl()}`,
                  text: `${contextPage.getChannelParameters().pageTitlePrefix}`
                }}
              >
                <HeaderSearch
                  placeholder="Search"
                  visuallyHiddenLabel="Search the NHS digital service manual"
                />
                <BrComponent path="menu" page={contextPage} mapping={pageMapping} component={headerComponent} isClientComponent={isClientComponent}>
                  {({ page: contextPage, mapping: pageMapping, component: menuComponent, isClientComponent }) =>
                    <Menu component={menuComponent} page={contextPage} mapping={pageMapping} isClientComponent={isClientComponent} />
                  }
                </BrComponent>
              </Header>
            </>
          }
        </BrComponent>
        <section className="container flex-fill pt-3">
          <BrComponent path="main" page={contextPage} mapping={pageMapping} component={component}/>
        </section>
        <BrComponent path="footer" page={contextPage} mapping={pageMapping} component={component}>
          {({page: contextPage, mapping: pageMapping, component: footerComponent, isClientComponent}) =>
            <BrComponent path="menu" page={contextPage} mapping={pageMapping} component={footerComponent} isClientComponent={isClientComponent}>
              {({page: contextPage, mapping: pageMapping, component: menuComponent, isClientComponent}) =>
                <FooterMenu component={menuComponent} page={contextPage} mapping={pageMapping}
                            isClientComponent={isClientComponent}/>
              }
            </BrComponent>
          }
        </BrComponent>
      </>
    )}
  </BrPage>
}

export default BrxAppClient;
