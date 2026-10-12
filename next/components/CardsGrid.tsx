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

import {BrProps} from '@bloomreach/react-sdk';
import {Document, getDocuments} from '@bloomreach/spa-sdk';
import React, {JSX} from 'react';
import {Card, CardGroup, CardGroupItem} from "nhsuk-react-components";
import {sanitize} from "../utils/sanitize";

export function CardsGrid({ component, page }: BrProps): JSX.Element | null {
  const documentRef = component?.getModels<DocumentModels>().document;
  const style = component?.getParameters<CardsGridParameters>().style ?? 'one-third';
  const document = documentRef && page?.getContent<Document>(documentRef);

  if (!document || !page) {
    return null;
  }

  const {cards: cardRefs = []} = document.getData<CardsGridData>();

  const cards = getDocuments(page, cardRefs)
    .map((card, index) => {
      const {content, link: linkRef, title} = card.getData<DocumentData>();
      const link = linkRef && page.getContent<Document>(linkRef);

      return {index, title, content, href: link?.getUrl() ?? '#'};
    });

  if (!cards.length) {
    return null;
  }

  return (
    <CardGroup>
      {cards.map(({index, title, content, href}) => (
        <CardGroupItem key={index} width={style}>
          <Card clickable>
            <Card.Heading size="m">
              <Card.Link href={href}>
                {title}
              </Card.Link>
            </Card.Heading>
            {content && (
              <Card.Description dangerouslySetInnerHTML={{
                __html: page.rewriteLinks(sanitize(content.value))
              }}/>
            )}
          </Card>
        </CardGroupItem>
      ))}
    </CardGroup>
  );
}
