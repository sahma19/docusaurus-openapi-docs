/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import ApiTabs from "@theme/ApiTabs";
import Details from "@theme/Details";
import { ResponseHeaders } from "@theme/ResponseExamples";
import ResponseSchema from "@theme/ResponseSchema";
import TabItem from "@theme/TabItem";
import { createDescription } from "docusaurus-plugin-openapi-docs/lib/markdown/createDescription";
import { ApiItem } from "docusaurus-plugin-openapi-docs/lib/types";

interface Props {
  id?: string;
  label?: string;
  responses: ApiItem["responses"];
}

const StatusCodes: React.FC<Props> = ({ label, id, responses }: any) => {
  if (!responses) return null;

  const codes = Object.keys(responses);
  if (codes.length === 0) return null;

  return (
    <ApiTabs label={label} id={id}>
      {codes.map((code) => {
        const response = responses[code];
        const responseHeaders = response.headers;

        return (
          // @ts-ignore
          <TabItem key={code} label={code} value={code}>
            <div>
              {response.description && (
                <div style={{ marginTop: ".5rem", marginBottom: ".5rem" }}>
                  {createDescription(response.description)}
                </div>
              )}
            </div>
            {responseHeaders && (
              <Details
                className="openapi-markdown__details"
                data-collapsed={true}
                open={false}
                style={{ textAlign: "left", marginBottom: "1rem" }}
                summary={
                  <summary>
                    <strong>Response Headers</strong>
                  </summary>
                }
              >
                <ResponseHeaders responseHeaders={responseHeaders} />
              </Details>
            )}
            <ResponseSchema
              title="Schema"
              body={{ content: response.content }}
            />
          </TabItem>
        );
      })}
    </ApiTabs>
  );
};

export default StatusCodes;
