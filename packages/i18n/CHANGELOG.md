# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.3.0](https://github.com/cpro-js/react-core-modules/compare/v0.2.0...v0.3.0) (2022-06-07)

### Bug Fixes

- **react-i18n:** allow also to use booleans & numbers for translation argument values ([3f860d0](https://github.com/cpro-js/react-core-modules/commit/3f860d04dd1c0a7849ce09f1487804e7bea7cf11))
- **react-i18n:** wrong example in README ([4f14a87](https://github.com/cpro-js/react-core-modules/commit/4f14a8734278c617ea87e36e81264e2a191e84c8))

### chore

- **react-i18n:** upgrade i18next from 19 to 21 ([5f4ee12](https://github.com/cpro-js/react-core-modules/commit/5f4ee12dddb649bff426ac2f317141c8376d94e4))

### Features

- **react-i18n:** flexibile determineLocale implementation ([c345525](https://github.com/cpro-js/react-core-modules/commit/c3455257334d0e58a302b85520a9b2d4842c5dc8))
- **react-i18n:** refactor i18next initialization & separate language and formatting locales ([1db10a4](https://github.com/cpro-js/react-core-modules/commit/1db10a48db63d26fc0721ed7a1025474926ef227))

### BREAKING CHANGES

- **react-i18n:** Use "localeResolver" instead of "determineLocale", which also allows for detection options via i18next and uses it by default if localeResolver is not defined at all.
  Use "supportedFormattingLocales" instead of "supportedLocales".
  I18nService interface changes regarding split into formattingLocale & translationLocale.
- **react-i18n:** different pluralization rules; see https://www.i18next.com/misc/migration-guide

# [0.2.0](https://github.com/cpro-js/react-core-modules/compare/v0.1.0...v0.2.0) (2022-06-02)

### Features

- upgrade to react 18 ([#21](https://github.com/cpro-js/react-core-modules/issues/21)) ([b9a0088](https://github.com/cpro-js/react-core-modules/commit/b9a0088b6c7d5a55d125e7137c46654f03f305ab))

# 0.1.0 (2021-09-10)

### Bug Fixes

- **i18n:** rerender on locale changes ([#14](https://github.com/cpro-js/react-core-modules/issues/14)) ([4c7bb0e](https://github.com/cpro-js/react-core-modules/commit/4c7bb0e824d03a38c807d899a06a2c7edd087877))

### Features

- **core:** export core modules as package ([#6](https://github.com/cpro-js/react-core-modules/issues/6)) ([f564b35](https://github.com/cpro-js/react-core-modules/commit/f564b35826e6ec4086bff3990ccfd88400d17207))
- **i18n:** preconfigured i18n integration for react apps ([#5](https://github.com/cpro-js/react-core-modules/issues/5)) ([3e77478](https://github.com/cpro-js/react-core-modules/commit/3e774787de3e54a38e08e44911b23931f72b04b4))
- **i18n:** support translation namespaces ([#13](https://github.com/cpro-js/react-core-modules/issues/13)) ([ee8d5d7](https://github.com/cpro-js/react-core-modules/commit/ee8d5d753038c96060d0d6f6f5e0b4939debed26))
- **i18n:** use ECMAScript Internationalization API - intl ([#9](https://github.com/cpro-js/react-core-modules/issues/9)) ([c74d6ec](https://github.com/cpro-js/react-core-modules/commit/c74d6ec00dc427fec1d284215483a3ce1249d965))
