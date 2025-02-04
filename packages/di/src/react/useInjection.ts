// fixes import  -> SyntaxError: Named export 'Provider' not found. The requested module 'inversify-react' is a CommonJS module,
import inversifyReact from "inversify-react";

export const useInjection = inversifyReact.useInjection;
