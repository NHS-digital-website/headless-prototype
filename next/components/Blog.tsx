/*
 * Copyright 2019-2026 Bloomreach
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

import {BrManageContentButton, BrProps} from '@bloomreach/react-sdk';
import {Document, ImageSet, Page} from '@bloomreach/spa-sdk';
import React, {JSX} from 'react';
import {sanitize} from "../utils/sanitize";
import {
  ActionLink,
  ContentsList,
  Hero,
  HeroHeading,
  HeroText,
  NotificationBanner,
  NotificationBannerHeading,
  ReviewDate,
  WarningCallout,
} from "nhsuk-react-components";

function BlogContentBlock({block, page}: {block: BlogContentBlock; page: Page}): JSX.Element | null {
  const links = block.links ?? [];

  switch (block.contentType) {
    case 'nhsd:LinkList':
      if (block.style === 'actionslinks') {
        return (
          <>
            {links.map(({label, link: linkRef}, index) => {
              const link = page.getContent<Document>(linkRef);
              return (
                <ActionLink key={index} href={link?.getUrl() ?? '#'}>
                  {label}
                </ActionLink>
              );
            })}
          </>
        );
      }

      return (
        <ContentsList>
          {links.map(({label, link: linkRef}, index) => {
            const link = page.getContent<Document>(linkRef);
            return (
              <ContentsList.Item key={index} href={link?.getUrl() ?? '#'}>
                {label}
              </ContentsList.Item>
            );
          })}
        </ContentsList>
      );

    case 'nhsd:Notification':
      if (block.style === 'warning') {
        return (
          <WarningCallout>
            {block.title && <WarningCallout.Heading>{block.title}</WarningCallout.Heading>}
            {block.content && (
              <div dangerouslySetInnerHTML={{__html: page.rewriteLinks(sanitize(block.content.value))}}/>
            )}
          </WarningCallout>
        );
      }

      return (
        <NotificationBanner success={block.style === 'success'} title={block.title}>
          {/*{block.title && <NotificationBannerHeading>{block.title}</NotificationBannerHeading>}*/}
          {block.content && (
            <div dangerouslySetInnerHTML={{__html: page.rewriteLinks(sanitize(block.content.value))}}/>
          )}
        </NotificationBanner>
      );

    default:
      return null;
  }
}

export function Blog ({component, page, isClientComponent, children}: BrProps & {
  children?: React.ReactNode
}): JSX.Element | null {
  const documentRef = component?.getModels<DocumentModels>().document;
  const document = documentRef && page.getContent<Document>(documentRef);

  if (!document) {
    return null;
  }

  const {
    hero,
    introduction,
    content = [],
    date,
  } = document.getData<BlogData>();

  const imageRef = hero?.image;
  const imageSet = imageRef && page.getContent<ImageSet>(imageRef);
  const image = imageSet && imageSet.getOriginal();

  return (
    <>
      <Hero imageSrc={image?.getUrl()}>
        {/* buttons should only be rendered on the client side */}
        {isClientComponent &&
          <BrManageContentButton
            content={document}
            documentTemplateQuery="new-banner-document"
            folderTemplateQuery="new-banner-folder"
            parameter="document"
            root="banners"
            relative
            pickerSelectableNodeTypes="nhsd:bannerdocument"
            page={page}
          />
        }

        {hero.title &&
          <HeroHeading>
            {hero.title}
          </HeroHeading>
        }
        {hero.description && page && (
          <HeroText dangerouslySetInnerHTML={{
            __html: page.rewriteLinks(sanitize(hero.description.value))
          }}/>
        )}
      </Hero>

      {introduction && (
        <div dangerouslySetInnerHTML={{__html: page.rewriteLinks(sanitize(introduction.value))}}/>
      )}

      {content.map((block, index) => (
        <BlogContentBlock key={index} block={block} page={page}/>
      ))}

      {date && <ReviewDate lastReviewed={new Date(date).toDateString()} />}

      {children}
    </>
  );
}
