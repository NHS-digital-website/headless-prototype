/*
 * Copyright 2026 Bloomreach
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

'use client';

import {JSX} from 'react';
import {ErrorPage} from '../components/ErrorPage';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError ({error}: Props): JSX.Element {
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="stylesheet" href="/nhsuk-frontend-10.6.1.min.css"/>
      <title>brXM + Next.js = ♥️</title>
    </head>
    <body className="nhsuk-frontend-supported">
    <div className="d-flex flex-column vh-100">
      <ErrorPage error={error}/>
    </div>
    </body>
    </html>
  );
}
