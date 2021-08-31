import { useInjection } from "@cpro-js/react-di";

import { I18nService } from "../I18nService";

export const useI18n = (): I18nService => {
  // return service
  return useInjection(I18nService);
};
