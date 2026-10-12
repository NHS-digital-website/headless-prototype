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
import Link from 'next/link';
import React, {JSX} from 'react';
import {BodyText, Card, CardGroup, CardGroupItem, Pagination} from 'nhsuk-react-components';
import {sanitize} from "../utils/sanitize";

interface NewsListItemProps {
  item: Document;
  page: Page;
  isClientComponent?: boolean;
}

export function BlogListItem ({item, page, isClientComponent}: NewsListItemProps): JSX.Element {
  const {hero, date} = item.getData<DocumentData>();
  const imageRef = hero.image;
  const imageSet = imageRef && page.getContent<ImageSet>(imageRef);
  const image = imageSet && imageSet.getOriginal();

  return (
    <CardGroupItem key={1} width="one-third">
      <Card clickable>
        {isClientComponent && <BrManageContentButton content={item} page={page}/>}
        <Card.Image
          alt=""
          src={image?.getUrl()}
        />
        <Card.Heading size="m">
          <Card.Link href={item.getUrl() ?? '/'}>
            {hero.title}
          </Card.Link>
        </Card.Heading>
        <BodyText className="nhsuk-body-s nhsuk-u-secondary-text-colour nhsuk-u-margin-bottom-0">
          {new Date(date).toDateString()}
        </BodyText>
        <Card.Description dangerouslySetInnerHTML={{
          __html: page.rewriteLinks(sanitize(hero.description.value))
        }}/>
      </Card>
    </CardGroupItem>
  );
}

interface NewsListPaginationProps extends Pageable {
  page: Page;
}

export function BRPagination ({page, ...props}: NewsListPaginationProps): JSX.Element | null {
  if (!props.showPagination) {
    return null;
  }

  return (
    <Pagination>
      {props.previous && (
        <Pagination.Link href={page.getUrl(`?page=${props.previousPage}`)} previous/>
      )}
      {props.pageNumbersArray.map((pageNumber, key) => (
        <Pagination.Item
          key={key}
          href={page.getUrl(`?page=${pageNumber}`)}
          number={pageNumber}
          current={pageNumber === props.currentPage}
        />
      ))}
      {props.next && (
        <Pagination.Link href={page.getUrl(`?page=${props.nextPage}`)} next/>
      )}
    </Pagination>
  );
}

export function BlogList ({component, page, isClientComponent}: BrProps): JSX.Element | null {
  const pageable = component?.getModels<PageableModels>().pageable;

  if (!pageable) {
    return null;
  }

  return (
    <div>
      <CardGroup>
        {pageable.items.map(
          (reference, key) => <BlogListItem key={key} item={page.getContent<Document>(reference)!} page={page}
                                            isClientComponent={isClientComponent}/>,
        )}
      </CardGroup>
      {/* buttons should only be rendered on the client side */}
      {isClientComponent && page.isPreview() && (
        <div className="has-edit-button float-right">
          <BrManageContentButton
            documentTemplateQuery="new-news-document"
            folderTemplateQuery="new-news-folder"
            root="news"
            page={page}
          />
        </div>
      )}
      <BRPagination {...pageable} page={page}/>
    </div>
  );
}
