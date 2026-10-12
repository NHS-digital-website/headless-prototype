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
import {Document, ImageSet} from '@bloomreach/spa-sdk';
import Link from 'next/link';
import React, {JSX} from 'react';
import {sanitize} from '../utils/sanitize';
import {Hero, HeroHeading, HeroText} from "nhsuk-react-components";

export function Banner({ component, page, isClientComponent }: BrProps): JSX.Element | null {
  const documentRef = component?.getModels<DocumentModels>().document;
  const imageVariant = component?.getParameters<BannerParameters>().imageVariant;
  const document = !!documentRef && page?.getContent(documentRef);

  if (!document) {
    return null;
  }

  const {content, image: imageRef, link: linkRef, title} = document.getData<DocumentData>();
  const imageSet = imageRef && page.getContent<ImageSet>(imageRef);
  const image = imageSet && (imageVariant ? imageSet.getVariant(imageVariant) : imageSet.getOriginal());
  const link = linkRef && page.getContent<Document>(linkRef);

  return (
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

      {title &&
        <HeroHeading>
          {title}
        </HeroHeading>
      }
      {content && page && (
        <HeroText dangerouslySetInnerHTML={{
          __html: page.rewriteLinks(sanitize(content.value))
        }}/>
        )}
      </Hero>
  );
}
