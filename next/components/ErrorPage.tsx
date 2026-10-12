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

import React, {JSX, useEffect} from 'react';
import {BodyText, Col, Container, Footer, Header, Heading, Row} from 'nhsuk-react-components';

interface Props {
  error: Error & { digest?: string };
}

export function ErrorPage ({error}: Props): JSX.Element {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (

    <>
      <Header
        logo={{
          href: '/'
        }}
      />
      <Container>
        <main
          className="nhsuk-main-wrapper"
          id="maincontent"
        >
          <Row>
            <Col width="full">
              <Heading headingLevel="h1">
                Sorry, there is a problem with the service
              </Heading>
              <BodyText>
                Try again later.
              </BodyText>
            </Col>
          </Row>
        </main>
      </Container>
      <Footer/>
    </>
  );
}
