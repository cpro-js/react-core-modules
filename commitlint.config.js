const {
  utils: { getPackages },
} = require("@commitlint/config-lerna-scopes");

module.exports = {
  extends: [
    "@commitlint/config-conventional",
    "@commitlint/config-lerna-scopes",
  ],
  rules: {
    "body-leading-blank": [2, "always"],
    "body-max-length": [0],
    "footer-leading-blank": [2, "always"],
    "footer-max-length": [0],
    "footer-max-line-length": [0],
    "scope-enum": async (ctx) => [
      2,
      "always",
      [
        ...(await getPackages(ctx)),
        // Insert custom scopes below:
        "release",
      ],
    ],
  },
};
