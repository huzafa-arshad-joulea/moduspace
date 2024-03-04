import joinUrl from "./join-url";

export const hostName =
  process.env.REACT_APP_MODUSPACE_URL ?? "https://api.moduspace.sg";
export const client =
  process.env.REACT_APP_MODUSPACE_CLIENT ?? "moduspace-example";

export const rolePermissions = ["superuser", "examples"];

export const rolePermissionEnums = {
  superuser: "superuser",
  examples: "examples",
};

export const ModuspaceEndpoints = {
  REFRESH_TOKEN_ENDPOINT() {
    return joinUrl(
      hostName,
      "api/v1/refresh-token"
    );
  },
  CREATE_NEW_SESSION_ENDPOINT(client: string) {
    return joinUrl(
      hostName,
      "api/v1/session",
      client,
      "new"
    );
  },
  VERIFY_ANTICOUNTERFEIT_TAG_ENDPOINT(
    client: string,
    antiCounterfeitTag: string
  ) {
    return joinUrl(
      hostName,
      "api/v1/products/moducase/anti-counterfeit",
      client,
      "verify-tag",
      antiCounterfeitTag
    );
  },
  REPORT_ANTICOUNTERFEIT_TAG_ENDPOINT(client: string) {
    return joinUrl(
      hostName,
      "api/v1/products/moducase/anti-counterfeit",
      client,
      "report"
    );
  },
};
