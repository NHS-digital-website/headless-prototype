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

interface BannerParameters {
  imageVariant?: string;
}

interface CardsGridParameters {
  style?: import('nhsuk-react-components').ColWidth;
}

interface DocumentModels {
  document: import('@bloomreach/spa-sdk').Reference;
}

interface CardsGridData extends DocumentData {
  cards: import('@bloomreach/spa-sdk').Reference[];
}

interface DocumentContent {
  value: string;
}

interface DocumentData {
  author: string;
  content: DocumentContent;
  date: number;
  publicationDate: number;
  image: import('@bloomreach/spa-sdk').Reference;
  introduction: string;
  title: string;

  [property: string]: any;
}

interface BlogHero {
  title?: string;
  description?: DocumentContent;
  image?: import('@bloomreach/spa-sdk').Reference;
}

interface BlogContentLink {
  label: string;
  link: import('@bloomreach/spa-sdk').Reference;
}

interface BlogContentBlock {
  contentType: string;
  style?: string;
  title?: string;
  content?: DocumentContent;
  links?: BlogContentLink[];
}

interface BlogData {
  hero: BlogHero;
  introduction?: DocumentContent;
  content?: BlogContentBlock[];
  date: number;

  [property: string]: any;
}

interface MenuModels {
  menu: import('@bloomreach/spa-sdk').Reference;
}

interface Pageable {
  currentPage: number;
  currentRange: number[];
  endOffset: number;
  endPage: number;
  items: import('@bloomreach/spa-sdk').Reference[];
  maxSize: number;
  next: boolean;
  nextBatch: boolean;
  nextPage: number | null;
  pageNumbersArray: number[];
  pageSize: number;
  previous: boolean;
  previousPage: number | null;
  showPagination: boolean;
  startOffset: number;
  startPage: number;
  total: number;
  totalPages: number;
  visiblePages: number;
}

interface PageableModels {
  pageable: Pageable;
}
